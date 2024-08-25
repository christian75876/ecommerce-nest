import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

interface IFindAllProduct {
    all(): Promise<Product[]>;
}

@Injectable()
export class FindAllProductService implements IFindAllProduct {
   constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
   ){};

   async all(): Promise<Product[]> {
    return await this.productRepository.find();
   }
}