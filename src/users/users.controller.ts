import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { UsersService } from './users.service';

import { ManagerCreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/common/interfaces';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createUserDto: ManagerCreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query()paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(term, updateUserDto);
  }

  @Patch('active/:id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
