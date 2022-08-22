import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
@Injectable()
export class HandleExceptions {

    public handleExceptions(error:any, message:string){
        if(error.code===11000) throw new BadRequestException(message);
        console.log(error);
        throw new InternalServerErrorException();
      }
}