import { Injectable } from '@nestjs/common';
import { CreateProductService, DeleteProductService, FindAllProductService, findOneProductService, UpdateProductService } from './services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly findAllProducts: FindAllProductService,
    private readonly findOneProduct: findOneProductService,
    private readonly DeleteProductService: DeleteProductService,  
  ){}

  async create(createProductDto: CreateProductDto) {
    return this.createProductService.newProduct(createProductDto);
  }

  findAll() {
    return this.findAllProducts.all();
  }

  async findOne(id: number) {
    return this.findOneProduct.product(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.updateProductService.updateProduct(id, updateProductDto);
  }

  async remove(id: string) {
    return this.DeleteProductService.deleteProduct(id);
  }
}
