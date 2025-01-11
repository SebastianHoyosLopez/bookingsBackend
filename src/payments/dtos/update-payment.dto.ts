import { IsString, IsNumber, IsOptional, IsDateString, Length, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @Length(1, 30)
    @IsOptional()
    code?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsString()
    @Length(3, 3)
    @IsOptional()
    currency?: string;

    @IsString()
    @Length(1, 20)
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @Length(1, 20)
    @IsOptional()
    paymentStatus?: string;

} 