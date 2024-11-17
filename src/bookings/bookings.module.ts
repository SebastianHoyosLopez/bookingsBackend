import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { BookingsService } from './services/bookings.service';
import { BookingsController } from './controllers/bookings.controller';
import { BookingsResolver } from './graphql/resolvers/bookings.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingEntity,
    ])
  ],
  providers: [
    BookingsService, BookingsResolver
  ],
  controllers: [BookingsController]
})
export class BookingsModule { }
