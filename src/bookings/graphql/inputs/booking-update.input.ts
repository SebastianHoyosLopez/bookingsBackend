import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

@InputType()
export class BookingUpdateInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsOptional()
  code: string;

  @Field()
  @IsOptional()
  date: Date;

  @Field()
  @IsOptional()
  status?: string;

  @Field()
  @IsOptional()
  isActive?: boolean;

  @Field()
  @IsOptional()
  description?: string;
}