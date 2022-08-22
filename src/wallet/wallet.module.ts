import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, walletSchema } from './entities/wallet.entity';

@Module({
  imports:[
    AuthModule, 
    CommonModule,
    MongooseModule.forFeature([{
      name: Wallet.name,schema: walletSchema
    }])
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
