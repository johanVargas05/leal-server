import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Product } from 'src/products/entities/product.entity';
import { ProductResponse } from './interfaces/products-response.interfaces';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Product.name)
    private readonly _productModel: Model<Product>,
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
    private readonly _http:AxiosAdapter
  ) {}

  async executeSeed() {

    await this.DeleteDB();
    await this.createSeedProducts();
    await this.createSeedUsers();

    return {ok: true, message:'Se creo con éxito  la data de prueba'}
  }


  private async  createSeedProducts() {
    try {
      const data = await this._http.get<ProductResponse>('https://dummyjson.com/products?limit=100');
      const products = data.products.map(product=>{
        delete product.id;
        product.brand = product.brand.toLocaleLowerCase().trim();
        return product;
      });
  
      await this._productModel.insertMany(products);
  
      return true;

    } catch (error) {
      this.messageError(`Ocurrió un error al momento de crear los productos de prueba`);
    }

  }

  private async  createSeedUsers() {
    try {
      const seedUsers = initialData.users;
      await this._userModel.insertMany(seedUsers);
      return true;
    } catch (error) {
      this.messageError(`Ocurrió un error al momento de crear los usuarios de prueba`);
    }
  }

  private async DeleteDB() {
    try {
      await this._productModel.deleteMany();
      await this._userModel.deleteMany();
      return true;
    } catch (error) {
      this.messageError(`Ocurrió un error al momento de eliminar las bases de datos`);
    }
  }

  private messageError(message: string){
    throw new InternalServerErrorException(message);
  }


}
