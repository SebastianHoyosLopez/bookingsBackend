import { IsString, IsNumber, IsOptional, IsDateString, Length } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @Length(1, 30)
  code: string;

  @IsNumber()
  amount: number;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  currency?: string = 'COP';

  @IsString()
  @Length(1, 20)
  paymentMethod: string;

  @IsString()
  @Length(1, 20)
  paymentStatus: string;

}