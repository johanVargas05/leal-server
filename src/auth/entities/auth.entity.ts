import { SchemaFactory,Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class User extends Document {
    @Prop({required: true})
    fullName:string;

    @Prop({
        unique: true,
        index:true,
        required:true
    })
    email:string;

    @Prop({select:false})
    password:string;

    @Prop({default:true})
    isActive:boolean;

    @Prop({type:[String],default:['user']})
    roles: string[];

    @Prop({default:0})
    points:number;


}

export const userSchema = SchemaFactory.createForClass(User);
