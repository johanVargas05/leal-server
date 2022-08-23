import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { ManagerCreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { EncryptAdapter } from 'src/common/adapters/bcrypt.adapter';

import { User } from 'src/auth/entities/auth.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HandleExceptions } from 'src/common/utils/handleExceptions.utils';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
    private readonly _encrypt:EncryptAdapter,
    private readonly _handleExceptions:HandleExceptions
  ){}

  async create(createUserDto: ManagerCreateUserDto) {
    try {
      const {password:pass,email} = createUserDto;
      
      const data = {
        ...createUserDto,
        email:email.toLocaleLowerCase().trim(),
        password: this._encrypt.hash(pass)
       };

      const user = await this._userModel.create(data);
    
      return {user};
      
    } catch (error) {
     this._handleExceptions.handleExceptions(error,`El usuario ya existe en BD ${JSON.stringify(error.keyValue)}`);
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    return this._userModel.find()
    .limit(limit)
    .skip((+offset-1)*limit)
  }

  async findOne(term: string) {
    let user:User;

    if(!user){
      user = await this._userModel.findOne({email:term.toLocaleLowerCase().trim()});
    }

  //Mongo Id
  if(!user && isValidObjectId(term)) {
    user = await this._userModel.findById(term);
  }
  
  
  if(!user) throw new NotFoundException(` No se encontró ningún usuario con este id o email'${term}'`);
  
  
    return user;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(term);

    if(updateUserDto.email) updateUserDto.email=updateUserDto.email.toLocaleLowerCase();

    if(updateUserDto.password) updateUserDto.password = this._encrypt.hash(updateUserDto.password);
   
    try {
      await user.updateOne(updateUserDto,{new:true});
      return {...user.toJSON(), ...updateUserDto};

    } catch (error) {
      this._handleExceptions.handleExceptions(error,`El usuario ya existe en BD ${JSON.stringify(error.keyValue)}`);
    }
   
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.isActive = !user.isActive;
    await user.updateOne({isActive:user.isActive});
    return user;
  }

}
