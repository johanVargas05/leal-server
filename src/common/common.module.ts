import { Module } from '@nestjs/common';
import EncryptAdapter from './adapters/bcrypt.adapter';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';

@Module({
  providers: [EncryptAdapter, ParseMongoIdPipe],
  exports: [EncryptAdapter, ParseMongoIdPipe],
})
export class CommonModule {}
