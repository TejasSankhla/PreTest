import { IsNotEmpty, IsString, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentResponseDto {
  @IsNotEmpty()
  @IsString()
  razorpay_order_id: string;

  @IsNotEmpty()
  @IsString()
  razorpay_payment_id: string;

  @IsNotEmpty()
  @IsString()
  razorpay_signature: string;
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  client: string; // Client user ID

  @IsNotEmpty()
  @IsDateString()
  slot: string; // Booking slot datetime

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PaymentResponseDto)
  paymentResponse: PaymentResponseDto;
}
