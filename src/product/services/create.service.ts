import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ExistProductService } from './existProduct.service';
import { Product } from '../entities/product.entity';

interface ICreateProduct {
  newProduct({ name, price, description }: CreateProductDto): Promise<Product>;
}

@Injectable()
export class CreateProductService implements ICreateProduct {
  constructor(
    private readonly exitsProduct: ExistProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async newProduct({
    name,
    price,
    description,
  }: CreateProductDto): Promise<Product> {
    const product = await this.exitsProduct.product(name);
    if (product) {
      throw new NotFoundException('Product already in database');
    }
    const newProduct = this.productRepository.create({
      name,
      price,
      description,
    });
    return await this.productRepository.save(newProduct);
  }
}