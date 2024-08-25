import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ExistProductService } from './existProduct.service';

interface IdeleteProduct {
  deleteProduct(id: string): Promise<void>;
}

@Injectable()
export class DeleteProductService implements IdeleteProduct {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly existProductById: ExistProductService,
  ) {}

  async deleteProduct(id: string): Promise<void> {
    const product = await this.existProductById.product(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
  }
}
