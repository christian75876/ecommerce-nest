import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({type: 'int',})
    id: number;

    @ManyToOne(() => User, (user: User) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToMany(() => Product, (product: Product) => product.id)
    products: Product[];

    @Column({ type: 'float' })
    total: number;
}
