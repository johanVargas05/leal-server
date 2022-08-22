import { IsOptional, IsString, MinLength } from "class-validator";
import { PaginationDto } from '../../common/dto/pagination.dto';

export class FilterDto extends PaginationDto{
    @IsOptional()
    @IsString()
    @MinLength(6)
    action?: string;
}