import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity'; import { BookingModel } from '../graphql/models/booking.model';
import { UpdateBookingDto } from '../dtos/update-booking.dto';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { BookingFilterInput } from '../graphql/inputs/booking-filter.input';
import { validateStatusTransition } from '../utils/validate-status';
import { StatusBookings } from 'src/constants/status-booking.enum';
import { Not } from 'typeorm';
import { PaymentEntity } from 'src/payments/entities/payment.entity';
import { CreatePaymentDto } from 'src/payments/dtos/create-payment.dto';
import { UpdatePaymentDto } from 'src/payments/dtos/update-payment.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly dataSource: DataSource
  ) { }

  // Método para obtener todas las reservas
  async findAll(filter?: BookingFilterInput): Promise<BookingModel[]> {
    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.payments', 'payments')
      .orderBy('booking.date', 'ASC')
      .addOrderBy('booking.time', 'ASC');

    if (filter) {
      if (filter.startDate) {
        queryBuilder.andWhere('booking.date >= :startDate', {
          startDate: filter.startDate
        });
      }

      if (filter.endDate) {
        queryBuilder.andWhere('booking.date <= :endDate', {
          endDate: filter.endDate
        });
      }

      if (filter.status) {
        queryBuilder.andWhere('booking.status = :status', {
          status: filter.status
        });
      }

      // Agregar paginación
      queryBuilder
        .skip((filter.page - 1) * filter.limit)
        .take(filter.limit);
    }

    const bookings = await queryBuilder.getMany();
    return bookings.map(booking => this.toModel(booking));
  }

  // Método para crear una nueva reserva
  async create(bookingDto: CreateBookingDto, paymentDtos: CreatePaymentDto[] = []): Promise<BookingModel> {
    return await this.dataSource.transaction(async manager => {
      // Validaciones previas
      const now = new Date();
      const bookingDate = new Date(bookingDto.date);
      bookingDate.setHours(0, 0, 0, 0);

      if (bookingDate < now) {
        throw new Error('No se pueden crear reservas en fechas pasadas');
      }

      const existingBooking = await this.bookingRepository.findOne({
        where: {
          date: bookingDto.date,
          time: bookingDto.time
        }
      });

      if (existingBooking) {
        throw new Error(`Ya existe una reserva para la fecha ${bookingDto.date} a las ${bookingDto.time}`);
      }

      // Creación de las entidades de pago si se proporcionan
      let payments = [];
      if (paymentDtos.length > 0) {
        payments = paymentDtos.map(paymentDto => {
          if (!paymentDto.paymentDate) {
            paymentDto.paymentDate = new Date();
          }
          return manager.create(PaymentEntity, paymentDto);
        });
        await manager.save(payments);
      }

      // Creación de la reserva
      const booking = manager.create(BookingEntity, {
        ...bookingDto,
        status: bookingDto.status as StatusBookings,
        payments: payments
      });

      const savedBooking = await manager.save(booking);
      return this.toModel(savedBooking);
    });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingModel> {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Si se está actualizando la fecha o la hora, verificar disponibilidad
    if (updateBookingDto.date || updateBookingDto.time) {
      const existingBooking = await this.bookingRepository.findOne({
        where: {
          date: updateBookingDto.date || booking.date,
          time: updateBookingDto.time || booking.time,
          id: Not(id) // Excluir la reserva actual de la búsqueda
        }
      });

      if (existingBooking) {
        throw new Error(`Ya existe una reserva para la fecha y hora especificadas`);
      }
    }

    // Validar la transición de estado si se está actualizando
    if (updateBookingDto.status) {
      const isValidTransition = validateStatusTransition(
        booking.status,
        updateBookingDto.status as StatusBookings
      );

      if (!isValidTransition) {
        throw new Error(`Invalid status transition from ${booking.status} to ${updateBookingDto.status}`);
      }
    }

    const updatedBooking = await this.bookingRepository.save({
      ...booking,
      ...updateBookingDto,
    } as BookingEntity);

    return this.toModel(updatedBooking);
  }

  async remove(id: string): Promise<boolean> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    const result = await this.bookingRepository.softDelete(id); // Usando softDelete en lugar de delete
    return result.affected > 0;
  }

  async updateWithPayments(
    id: string,
    updateBookingDto: UpdateBookingDto,
    updatePaymentDtos: UpdatePaymentDto[] = []
  ): Promise<BookingModel> {
    return await this.dataSource.transaction(async manager => {
      const booking = await this.bookingRepository.findOne({ where: { id }, relations: ['payments'] });

      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }

      // Actualizar la reserva
      Object.assign(booking, updateBookingDto);

      // Actualizar o agregar pagos
      for (const paymentDto of updatePaymentDtos) {
        let payment = booking.payments.find(p => p.id === paymentDto.id);
        if (payment) {
          // Actualizar pago existente
          Object.assign(payment, paymentDto);
        } else {
          // Agregar nuevo pago
          payment = manager.create(PaymentEntity, paymentDto);
          payment.booking = booking;
          booking.payments.push(payment);
        }
        await manager.save(payment);
      }

      const updatedBooking = await manager.save(booking);
      return this.toModel(updatedBooking);
    });
  }

  // Método para convertir BookingEntity a BookingModel
  private toModel(booking: BookingEntity): BookingModel {
    const model = new BookingModel();
    Object.assign(model, booking); // Asignar propiedades de BookingEntity a BookingModel
    return model;
  }
}
