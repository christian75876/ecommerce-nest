import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @ManyToMany(() => Order, (order: Order) =>order.products)
  orders: Order[]; // Correcto  
}
