import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  CreateProductService,
  DeleteProductService,
  ExistProductService,
  FindAllProductService,
  findOneProductService,
  UpdateProductService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    CreateProductService,
    UpdateProductService,
    findOneProductService,
    FindAllProductService,
    DeleteProductService,
    ExistProductService,
  ],
})
export class ProductModule {}
