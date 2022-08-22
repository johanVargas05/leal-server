import { IsBoolean,IsNumber,IsOptional,IsString, MinLength } from "class-validator";
import { CreateUserDto } from "src/auth/dto";

export class ManagerCreateUserDto extends CreateUserDto {
    @IsBoolean()
    @IsOptional()
    isActive:boolean;
    
    @IsString({each: true})
    roles: string[];

    @IsNumber()
    @MinLength(0)
    @IsOptional()
    points:number;
}
