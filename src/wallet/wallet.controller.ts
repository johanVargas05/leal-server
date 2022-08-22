import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FilterDto } from './dto/filter-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':id')
  AddPoints(@Param('id', ParseMongoIdPipe) id: string, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.add(id,createWalletDto);
  }

  @Get('points/:id')
  findOnePoints(@Param('id', ParseMongoIdPipe) id: string) {
    return this.walletService.findOnePoints(id);
  }

  @Get('history/:id')
  findOneHistory(@Param('id', ParseMongoIdPipe) id: string, @Query()paginationDto: FilterDto) {
    return this.walletService.findOneHistory(id, paginationDto);
  }

  @Patch(':id')
  removePoints(@Param('id',ParseMongoIdPipe) id: string, @Body() updateWalletDto: CreateWalletDto) {
    return this.walletService.remove(id, updateWalletDto);
  }

}
