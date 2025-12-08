import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../services/payment.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private readonly paymentService: PaymentService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const order = await this.paymentService.createOrder(createOrderDto.amount);
    return order;
  }
}
