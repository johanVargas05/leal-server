import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from '../common/interfaces/valid-roles.interfaces';
import { Category } from './interfaces/validationCategory.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query()paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Get('category/:category')
  findCategory(@Param('category') category: Category, @Query()paginationDto: PaginationDto) {
    return this.productsService.findCategory(category, paginationDto);
  }

  @Get('bran/:brand')
  findBrand(@Param('brand') brand: string, @Query()paginationDto: PaginationDto) {
    return this.productsService.findBrand(brand, paginationDto);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  update(@Param('id',ParseMongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin,ValidRoles.superUser)
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
