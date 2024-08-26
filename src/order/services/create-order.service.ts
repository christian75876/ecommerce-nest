import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/entities";
import { Product } from "src/product/entities/product.entity";
import { GetIdTokenService } from "./get-id-token.service";



interface ICreateOrder {
    createOrder(createOrderDto: CreateOrderDto, token: string): Promise<Order>; 
};

@Injectable()
export class CreateOrderService implements ICreateOrder {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        readonly getTokenService: GetIdTokenService
    ) {}

    async createOrder(createOrderDto: CreateOrderDto, token:string): Promise<Order> {
        const { productId, quantity } = createOrderDto;

        const user = await this.getTokenService.getUserFromToken(token);
        if (!user) {
            throw new UnauthorizedException('User not found or invalid token');
        }
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
