import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity'; import { BookingModel } from '../graphql/models/booking.model';
import { UpdateBookingDto } from '../dtos/update-booking.dto';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { BookingFilterInput } from '../graphql/inputs/booking-filter.input';
import { validateStatusTransition } from '../utils/validate-status';
import { StatusBookings } from 'src/constants/status-booking.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) { }

  // Método para obtener todas las reservas
  async findAll(filter?: BookingFilterInput): Promise<BookingModel[]> {
    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
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
  async create(bookingDto: CreateBookingDto): Promise<BookingModel> {
    const booking = this.bookingRepository.create({
      ...bookingDto,
      status: bookingDto.status as StatusBookings
    });
    const savedBooking = await this.bookingRepository.save(booking);
    return this.toModel(savedBooking);
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingModel> {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
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

  // Método para convertir BookingEntity a BookingModel
  private toModel(booking: BookingEntity): BookingModel {
    const model = new BookingModel();
    Object.assign(model, booking); // Asignar propiedades de BookingEntity a BookingModel
    return model;
  }
}
