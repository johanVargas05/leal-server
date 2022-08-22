import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { User, userSchema } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    MongooseModule.forFeature([{
      name: User.name, schema: userSchema
    }]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
