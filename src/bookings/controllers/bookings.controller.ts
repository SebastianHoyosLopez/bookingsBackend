import { Controller, Get } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
  @Get()
  getTest() {
    return 'Este es un controlador de prueba para bookings';
  }
}
