import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BookingModel } from "../models/booking.model";
import { BookingCreateInput } from "../inputs/booking-create.input";
import { BookingsService } from "src/bookings/services/bookings.service";
import { UpdateBookingDto } from "src/bookings/dtos/update-booking.dto";
import { BookingUpdateInput } from "../inputs/booking-update.input";

@Resolver(() => BookingModel)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) { }

  @Query(() => [BookingModel])
  async getBookings(): Promise<BookingModel[]> {
    return this.bookingsService.findAll();
  }

  @Mutation(() => BookingModel)
  async createBooking(@Args('input') input: BookingCreateInput): Promise<BookingModel> {
    return this.bookingsService.create(input);
  }

  @Mutation(() => BookingModel)
  async updateBooking(
    @Args('id') id: string,
    @Args('input') input: BookingUpdateInput,
  ): Promise<BookingModel> {
    return this.bookingsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteBooking(@Args('id') id: string): Promise<boolean> {
    return this.bookingsService.remove(id);
  }
}
