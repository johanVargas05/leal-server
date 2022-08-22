import { IsDate, IsNumber, IsString, isUUID, Min, MinLength } from "class-validator";

export class CreateWalletDto {
    @IsString()
    @MinLength(6)
    action:      'deposit' | 'egress';
    
    @IsDate()
    createAt:    Date;  
    
    @IsString()
    @MinLength(1)
    description: string;     

    @IsNumber()
    @Min(0.5)
    points: number;     
}
