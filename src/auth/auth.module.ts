import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { User, userSchema } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenProvider } from './provider/token.provider';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([{
      name: User.name, schema: userSchema
    }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory:async()=>({
        secret:process.env.JWT_SECRET_KEY,
        signOptions:{expiresIn:process.env.EXPIRES_IN_TOKEN}
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenProvider, JwtStrategy],
  exports:[JwtStrategy, PassportModule, JwtModule, MongooseModule]
})
export class AuthModule {}
