import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FilterDto } from './dto/filter-wallet.dto';
import { Auth } from 'src/auth/decorators';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':id')
  @Auth()
  AddPoints(@Param('id', ParseMongoIdPipe) id: string, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.add(id,createWalletDto);
  }

  @Get('points/:id')
  @Auth()
  findOnePoints(@Param('id', ParseMongoIdPipe) id: string) {
    return this.walletService.findOnePoints(id);
  }

  @Get('history/:id')
  @Auth()
  findOneHistory(@Param('id', ParseMongoIdPipe) id: string, @Query()paginationDto: FilterDto) {
    return this.walletService.findOneHistory(id, paginationDto);
  }

  @Patch(':id')
  @Auth()
  removePoints(@Param('id',ParseMongoIdPipe) id: string, @Body() updateWalletDto: CreateWalletDto) {
    return this.walletService.remove(id, updateWalletDto);
  }

}
