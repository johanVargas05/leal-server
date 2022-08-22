import { Module } from '@nestjs/common';
import EncryptAdapter from './adapters/bcrypt.adapter';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { HandleExceptions } from './utils/handleExceptions.utils';

@Module({
  providers: [EncryptAdapter, ParseMongoIdPipe, HandleExceptions],
  exports: [EncryptAdapter, ParseMongoIdPipe, HandleExceptions],
})
export class CommonModule {}
