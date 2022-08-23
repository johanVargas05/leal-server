import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { HandleExceptions } from 'src/common/utils/handleExceptions.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Category } from './interfaces/validationCategory.interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly _productModel: Model<Product>,
    private readonly _handleExceptions:HandleExceptions
  ){}

  async create(createProductDto: CreateProductDto) {

    createProductDto.brand = createProductDto.brand.toLocaleLowerCase().trim();

    try {
      const product = await this._productModel.create(createProductDto);
    
      return {product};
      
    } catch (error) {
     this._handleExceptions.handleExceptions(error,`El producto ya existe en BD con el nombre de ${createProductDto.title}`);
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    return this._productModel.find()
    .limit(limit)
    .skip((+offset-1)*limit)
  }

  findCategory( category:Category, paginationDto:PaginationDto ) {
    const {limit=10, offset=0} = paginationDto;
    return this._productModel.find({category})
    .limit(limit)
    .skip((+offset-1)*limit)
  }

  findBrand( brand:string, paginationDto:PaginationDto ) {
    const {limit=10, offset=0} = paginationDto;
    return this._productModel.find({brand})
    .limit(limit)
    .skip((+offset-1)*limit)
  }

  async findOne(id: string) {
    let product: Product;
    product = await this._productModel.findById(id);
    if(!product) throw new NotFoundException(`No hay un producto relacionado al id ${id}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if(updateProductDto.brand) updateProductDto.brand=updateProductDto.brand.toLocaleLowerCase();
   
    try {
      await product.updateOne(updateProductDto,{new:true});
      return {...product.toJSON(), ...updateProductDto};

    } catch (error) {
      this._handleExceptions.handleExceptions(error,`El producto ya existe en BD con el nombre de ${updateProductDto.title}`);
    }
   
  }

 async remove(id: string) {
    const {deletedCount} = await this._productModel.deleteOne({_id:id});

    if(deletedCount==0) throw new BadRequestException(`El producto con '${id}' no existe`);

    return {ok:true, message:'Producto eliminado con éxito'};
  }
}
