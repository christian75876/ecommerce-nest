import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindRole {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { };
    async getRole(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: { id } });
        return role
    }
}