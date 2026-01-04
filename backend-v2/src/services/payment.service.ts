import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import type { Orders } from 'razorpay/dist/types/orders';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;
  private keySecret: string;
  private keyId: string;

  constructor(private readonly configService: ConfigService) {
    this.keyId = this.configService.get<string>('payment.razorpayKeyId') || '';
    this.keySecret =
      this.configService.get<string>('payment.razorpayKeySecret') || '';

    this.razorpay = new Razorpay({
      key_id: this.keyId,
      key_secret: this.keySecret,
    });
  }

  async createOrder(amount: number): Promise<Orders.RazorpayOrder> {
    const options = {
      amount: amount, // amount in the smallest currency unit (paise)
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await this.razorpay.orders.create(options);
    return order;
  }

  verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === signature;
  }

  getKeyId(): string {
    return this.keyId;
  }
}
