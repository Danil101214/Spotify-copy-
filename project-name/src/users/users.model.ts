import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose';
import { Roles } from 'src/roles/roles.model';
export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
    @Prop({required: true, unique: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true, default: 'user', })
    name: string;
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Roles'}]})
    roles: string[]
    @Prop({default: false})
    ban: boolean;
    @Prop({default: 'Описание бана'})
    ban_description: string;
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tracks'}]})
    track: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)