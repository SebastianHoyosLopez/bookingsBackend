import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class BookingCreateInput {
  @Field()
  @IsOptional()
  code?: string;

  @Field()
  @IsOptional()
  date: Date;

  @Field()
  @IsOptional()
  status: string;

  @Field()
  @IsOptional()
  isActive: boolean;

  @Field()
  @IsOptional()
  description: string;
}