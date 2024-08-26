import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToMany(() => Product, (product) => product.id)
    @JoinTable({
        name: "order_products",
        joinColumn: { name: "order_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
    })
    products: Product[];

    @Column({ type: 'float' })
    total: number;
}

