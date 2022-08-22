import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema({versionKey:false})
export class Product extends Document {

    @Prop({index:true})
    brand:              string;
    
    @Prop({index:true})
    category:           string;
    
    @Prop({default: 'Sin descripción'})
    description:        string;

    @Prop({default:0})
    discountPercentage: number;

    @Prop({type:[String],default:[]})
    images:             string[];

    @Prop({default:0})
    price:              number;
    
    @Prop({default:0})
    rating:             number;
    
    @Prop({default:0})
    stock:              number;
    
    @Prop()
    thumbnail:          string;

    @Prop({unique:true, index:true})
    title:              string;
}

export const productSchema = SchemaFactory.createForClass(Product);