import { IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { Category } from "../interfaces/validationCategory.interfaces";

export class CreateProductDto {
    @IsString()
    brand:              string;

    @IsString()
    category:           Category;

    @IsString()
    @IsOptional()
    description?:        string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    discountPercentage?: number;
    
    @IsString({each: true})
    @IsOptional()
    images?:             string[];

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    price?:              number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    rating?:             number;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(0)
    stock?:              number;

    @IsString()
    thumbnail:          string;

    @IsString()
    @MinLength(1)
    title:              string;
}

   