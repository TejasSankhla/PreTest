import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../services/payment.service';
import { CreateOrderDto } from './dto';
import type { Orders } from 'razorpay/dist/types/orders';

@Injectable()
export class OrderService {
  constructor(private readonly paymentService: PaymentService) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<Orders.RazorpayOrder> {
    const order = await this.paymentService.createOrder(createOrderDto.amount);
    return order;
  }
}
