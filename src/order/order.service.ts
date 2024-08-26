import { Injectable } from '@nestjs/common';
import { CreateOrderService } from './services';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';


@Injectable()
export class OrderService {
  constructor(
    private readonly createOderService : CreateOrderService,
  ){}

  async create(createOrder : CreateOrderDto): Promise <Order> {
    return await this.createOderService.createOrder(createOrder);
  }
}
