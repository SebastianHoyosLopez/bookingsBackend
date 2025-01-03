import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BookingModel } from "../models/booking.model";
import { BookingCreateInput } from "../inputs/booking-create.input";
import { BookingsService } from "src/bookings/services/bookings.service";
import { BookingUpdateInput } from "../inputs/booking-update.input";
import { BookingFilterInput } from "../inputs/booking-filter.input";
import { NotFoundException } from "@nestjs/common";

@Resolver(() => BookingModel)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) { }

  @Query(() => [BookingModel])
  async getBookings(
    @Args('filter', { nullable: true }) filter?: BookingFilterInput
  ): Promise<BookingModel[]> {
    return this.bookingsService.findAll(filter);
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

  @Mutation(() => Boolean, { description: 'Delete a booking by ID' })
  async deleteBooking(
    @Args('id', { description: 'ID of the booking to delete' }) id: string
  ): Promise<boolean> {
    try {
      return await this.bookingsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      throw error;
    }
  }
}
