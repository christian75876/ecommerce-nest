import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/entities";
import { Product } from "src/product/entities/product.entity";

interface ICreateOrder {
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>; 
};

@Injectable()
export class CreateOrderService implements ICreateOrder {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { userId, productId, quantity } = createOrderDto;

        const user = await this.userRepository.findOne({ where: { id: userId } });
        const product = await this.productRepository.findOne({ where: { id: productId } });

        if (!user || !product) {
            throw new NotFoundException('User or Product not found');
        }

        const order = new Order();
        order.user = user;
        order.products = [product];
        order.total = product.price * quantity;

        return this.orderRepository.save(order);
    }
}
