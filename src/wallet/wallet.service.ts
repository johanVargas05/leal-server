import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../auth/entities/auth.entity';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { FilterDto } from './dto/filter-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {

  constructor(
    @InjectModel(Wallet.name)
    private readonly _walletModel: Model<Wallet>,
    @InjectModel(User.name)
    private readonly _userModel: Model<User>,
  ){}


  async findOnePoints(id: string) {
    const user = await this._userModel.findById(id);
    
    if(!user) throw new NotFoundException(`No hay un usuario relacionado al id ${id}`);;
    
    const {points} = user;

    return {points};

  }

  async findOneHistory(id: string, filterDto:FilterDto) {
    const {limit=10, offset=1,action=null} = filterDto;
    const query = (action)?{idUser:id,action}:{idUser:id};
    const wallet = await this._walletModel.find(query)
    .limit(limit)
    .skip((+offset-1)*limit)
    .sort({createAt:-1})
    if(wallet.length==0) throw new NotFoundException('No hay movimientos relacionados a este usuario');

    return wallet;

  }

  async add(id: string, createWalletDto: CreateWalletDto) {
       const { points:oldPoints } = await this.findOnePoints(id);
       try {
        const { points:newPoints } = createWalletDto;
        const points = oldPoints + newPoints;
        
        await this._userModel.findByIdAndUpdate(id,{points});

        const data = {idUser:id, ...createWalletDto};
        
        const wallet = await this._walletModel.create(data);

        return wallet;
       
       } catch (error) {
        console.error(error);
        throw new InternalServerErrorException('Tuvimos problemas al realizar el deposito en la billetera, error: '+JSON.stringify(error));
       }
  }

  async remove(id: string, updateWalletDto: CreateWalletDto) {
    const { points:oldPoints } = await this.findOnePoints(id);
    const { points:newPoints } = updateWalletDto;
    const points = oldPoints - newPoints;
    if(newPoints>oldPoints) throw new BadRequestException({
      statusCode: 400,
      message:  `No puedes redimir más puntos de los que tienes disponibles, tienes una diferencia de ${points}`,
      error: "Bad Request",
      points
    });
    try {
     await this._userModel.findByIdAndUpdate(id,{points});

     const data = {idUser:id, ...updateWalletDto};
     
     const wallet = await this._walletModel.create(data);

     return wallet;
    
    } catch (error) {
     console.error(error);
     throw new InternalServerErrorException('Tuvimos problemas al realizar el cambio de puntos, error: '+JSON.stringify(error));
    }
  }
}
