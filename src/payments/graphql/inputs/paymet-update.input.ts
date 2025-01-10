import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNumber, IsDateString, Length, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class PaymentUpdateInput {
    @Field()
    @IsUUID()
    id: string;

    @Field({ nullable: true })
    @IsString()
    @Length(1, 30)
    @IsOptional()
    code?: string;

    @Field({ nullable: true })
    @IsNumber()
    @IsOptional()
    amount?: number;

    @Field({ nullable: true })
    @IsString()
    @Length(3, 3)
    @IsOptional()
    currency?: string;

    @Field({ nullable: true })
    @IsString()
    @Length(1, 20)
    @IsOptional()
    paymentMethod?: string;

    @Field({ nullable: true })
    @IsString()
    @Length(1, 20)
    @IsOptional()
    paymentStatus?: string;

    @Field({ nullable: true })
    @IsDateString()
    @IsOptional()
    paymentDate?: Date;
}
