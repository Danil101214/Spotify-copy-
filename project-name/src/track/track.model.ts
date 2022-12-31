import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose';
export type TrackDocument = Track & Document
@Schema({timestamps: true})
export class Track {
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    artist: string;
    @Prop({required: true})
    text: string;
    @Prop()
    listens: number
    @Prop({required: true})
    picture:string;
    @Prop({required: true})
    audio: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track)