import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsUUID, Matches } from "class-validator";

@InputType()
export class BookingUpdateInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  code?: string;

  @Field({ nullable: true })
  @IsOptional()
  date?: Date;

  @Field()
  @IsOptional()
  status?: string;

  @Field()
  @IsOptional()
  isActive?: boolean;

  @Field()
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in format HH:mm'
  })
  time?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;
}