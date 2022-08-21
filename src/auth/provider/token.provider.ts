import {Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../interfaces/jwr-payload.interfaces';
import { User } from '../entities/auth.entity';


@Injectable()
export class TokenProvider {

    constructor( private readonly _jwtService:JwtService){}

    public getJwtToken(user:User){

        const payload = this.getPayload(user);

        return  this._jwtService.sign(payload);
     }
   
     private getPayload(user:User): JwtPayload{
       return {
         id:user._id
        };
     }
}