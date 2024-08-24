import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
}
