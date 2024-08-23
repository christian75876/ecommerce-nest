import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ type: 'varchar', length: 70, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    // @Column()
    // roleId:number

    @ManyToOne(() => Role, (role: Role) => role.users)
    @JoinColumn({ name: 'roleId' })
    role: Role;  // Correcto


}
