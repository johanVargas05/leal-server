import { UnauthorizedException,Injectable} from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Strategy,ExtractJwt } from "passport-jwt";
import { Model } from 'mongoose';

import { JwtPayload } from "../interfaces/jwr-payload.interfaces";
import { User } from '../entities/auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
        private readonly _configService: ConfigService
        ){
        super({
            secretOrKey: _configService.get('JWT_SECRET_KEY'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
        }


    async validate(payload:JwtPayload) :Promise<User> {
        const { id } = payload;
        const user = await this._userModel.findOne({id});

        if (!user) throw new UnauthorizedException('Token invalido');
        if (!user.isActive) throw new UnauthorizedException('El usuario esta inactivo, comuníquese con un administrador'); 

        return user;
    }


}