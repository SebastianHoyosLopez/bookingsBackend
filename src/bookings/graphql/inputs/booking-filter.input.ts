import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";
import { IsDate, IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { StatusBookings } from "src/constants/status-booking.enum";

// Registrar el enum para GraphQL
registerEnumType(StatusBookings, {
  name: 'StatusBookings', // Este nombre se usará en el schema de GraphQL
  description: 'Los estados posibles para una reserva',
});

@InputType()
export class BookingFilterInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(() => StatusBookings, { nullable: true })
  @IsOptional()
  @IsEnum(StatusBookings)
  status?: StatusBookings;
}