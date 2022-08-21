import { Module } from '@nestjs/common';
import EncryptAdapter from './adapters/bcrypt.adapter';

@Module({
  providers: [EncryptAdapter],
  exports: [EncryptAdapter],
})
export class CommonModule {}
