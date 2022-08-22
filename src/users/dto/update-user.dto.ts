import { PartialType } from '@nestjs/mapped-types';
import { ManagerCreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(ManagerCreateUserDto) {}
