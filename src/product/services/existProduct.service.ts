import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

interface IExistProduct {
  product(name: string): Promise<Product>;
}

@Injectable()
export class ExistProductService implements IExistProduct {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async product(name: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { name } });
    return product;
  }
}