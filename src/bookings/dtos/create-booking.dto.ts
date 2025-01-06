import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in format HH:mm'
  })
  time: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}