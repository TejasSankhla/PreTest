import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { SkipResponseTransform } from '../../common/decorators/skip-response-transform.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // POST /order - create a Razorpay order
  @Post()
  @HttpCode(HttpStatus.OK)
  @SkipResponseTransform()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    // Return the Razorpay order directly (not wrapped in standard response)
    // This matches the original backend behavior where it returns order directly
    const order = await this.orderService.createOrder(createOrderDto);
    return order;
  }
}
