import { IsBoolean,IsNumber,IsOptional,IsString, Min, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto";

export class ManagerCreateUserDto extends CreateUserDto {
    @IsBoolean()
    @IsOptional()
    isActive?:boolean;
    
    @IsString({each: true})
    roles: string[];

    @IsNumber()
    @Min(0)
    @IsOptional()
    points?:number;
}
