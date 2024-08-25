import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 70, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role: Role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: number; // Correcto

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
