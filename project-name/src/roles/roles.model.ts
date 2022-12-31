import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose';
export type RolesDocument = Roles & Document

@Schema({timestamps: true})
export class Roles {
    @Prop({required: true})
    id_user: string
    @Prop({require: true, default: 'USER'})
    value: string
    @Prop({required: true})
    description: string
}

export const RolesSchema = SchemaFactory.createForClass(Roles)