import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNumber, IsDateString, Length, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class PaymentCreateInput {
    @Field()
    @IsString()
    @Length(1, 30)
    code: string;

    @Field()
    @IsNumber()
    amount: number;

    @Field()
    @IsString()
    @Length(3, 3)
    currency: string;

    @Field()
    @IsString()
    @Length(1, 20)
    paymentMethod: string;

    @Field()
    @IsString()
    @Length(1, 20)
    paymentStatus: string;

}
