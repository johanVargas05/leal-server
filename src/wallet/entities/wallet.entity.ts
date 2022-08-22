import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from "mongoose";

import { User } from 'src/auth/entities/auth.entity';

@Schema({versionKey:false})
export class Wallet extends Document {
    @Prop({
        type:String,
        index:true
    })
    action: 'deposit' | 'egress';
    
    @Prop({type:Date})
    createAt: Date;

    @Prop() 
    description: string;

    @Prop() 
    points: number;

    @Prop({type:SchemaTypes.ObjectId, ref: User.name })
    idUser: Types.ObjectId;
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
