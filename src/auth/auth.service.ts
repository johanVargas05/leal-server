import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, LoginUserDto } from './dto';
import EncryptAdapter from '../common/adapters/bcrypt.adapter';
import { User } from './entities/auth.entity';
import { TokenProvider } from './provider/token.provider';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
    private readonly _encrypt:EncryptAdapter,
    private readonly _token:TokenProvider,
    ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const {password:pass,email} = createUserDto;
      
      const data = {
        ...createUserDto,
        email:email.toLocaleLowerCase().trim(),
        password: this._encrypt.hash(pass)
       };

      const user = await this._userModel.create(data);
      const token = this._token.getJwtToken(user);
      user.password=null;
      return {user, token};
      
    } catch (error) {
     this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
   const {email, password} = loginUserDto;

   const user = await this._userModel.findOne({email},{email:true,password:true,fullName:true,isActive:true});
   if(!user) throw new UnauthorizedException('Credenciales no validas');

   const auth = this._encrypt.compare(password, user.password);
   if(!auth) throw new UnauthorizedException('Credenciales no validas');
   
   const token = this._token.getJwtToken(user);
    return {user, token};
  }

  async refreshToken(user:User) {
    const token = this._token.getJwtToken(user);
    return {token};
  }

  private handleExceptions(error:any){
    if(error.code===11000) throw new BadRequestException(`El usuario ya existe en BD ${JSON.stringify(error.keyValue)}`);
    console.log(error);
    throw new InternalServerErrorException();
  }


}
