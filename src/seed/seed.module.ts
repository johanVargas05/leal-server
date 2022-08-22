import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { ProductsModule } from '../products/products.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    CommonModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
