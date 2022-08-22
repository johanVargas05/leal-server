import { Module } from '@nestjs/common';
import { AxiosAdapter, EncryptAdapter } from './adapters';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { HandleExceptions } from './utils/handleExceptions.utils';

@Module({
  providers: [EncryptAdapter, ParseMongoIdPipe, HandleExceptions, AxiosAdapter],
  exports: [EncryptAdapter, ParseMongoIdPipe, HandleExceptions, AxiosAdapter],
})
export class CommonModule {}
