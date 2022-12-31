import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MusicDocument = HydratedDocument<MusicSort>;

@Schema()
export class MusicSort {
  @Prop()
  artist: string;

  @Prop()
  picture: string;

  @Prop()
  description: string;
  
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'musicsorts'}]})
  musics: string[]  
}

export const MusicSortSchema = SchemaFactory.createForClass(MusicSort);