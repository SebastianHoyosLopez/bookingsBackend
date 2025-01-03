import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString, IsDate, IsEnum, IsBoolean, Matches } from "class-validator";
import { StatusBookings } from "src/constants/status-booking.enum";


@InputType()
export class BookingCreateInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  code: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field(() => String)
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in format HH:mm'
  })
  time: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(StatusBookings)
  status?: StatusBookings;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}