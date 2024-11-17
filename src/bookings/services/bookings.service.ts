import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { BookingCreateInput } from '../graphql/inputs/booking-create.input';
import { BookingModel } from '../graphql/models/booking.model';
import { UpdateBookingDto } from '../dtos/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepo: Repository<BookingEntity>,
  ) {}

  // Método para obtener todas las reservas
  async findAll(): Promise<BookingModel[]> {
    const bookings = await this.bookingRepo.find();
    return bookings.map(booking => this.toModel(booking)); // Convertir a BookingModel
  }

  // Método para crear una nueva reserva
  async create(input: BookingCreateInput): Promise<BookingModel> {
    const booking = this.bookingRepo.create(input); // Crear una nueva entidad BookingEntity
    const savedBooking = await this.bookingRepo.save(booking); // Guardar en la base de datos
    return this.toModel(savedBooking); // Convertir a BookingModel
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<BookingEntity> {
    await this.bookingRepo.update(id, updateBookingDto);
    return this.bookingRepo.findOne({ where: { id } });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.bookingRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return true; // Retorna true si la eliminación fue exitosa
  }

  // Método para convertir BookingEntity a BookingModel
  private toModel(booking: BookingEntity): BookingModel {
    const model = new BookingModel();
    Object.assign(model, booking); // Asignar propiedades de BookingEntity a BookingModel
    return model;
  }
}
