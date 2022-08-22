import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, productSchema } from './entities/product.entity';

import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Product.name, schema: productSchema
    }]),
    AuthModule,
    CommonModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[MongooseModule]
})
export class ProductsModule {}
