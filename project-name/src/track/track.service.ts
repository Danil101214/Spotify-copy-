import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { FileService, TypedFile } from 'src/File/File.Service';
import { MusicDocument, MusicSort } from 'src/music-sort/Model/Model';
import { TrackDto } from './dto/track.dto';
import { Track, TrackDocument } from './track.model';
import fs from 'fs'
import path from 'path';

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService, @InjectModel(MusicSort.name) private MusicRepository: Model<MusicDocument> ) {}
    async create(dto: TrackDto, picture, audio): Promise<Track> {
        try {
            mongoose.Types.ObjectId.isValid('your id here');
            const audioPath = await this.fileService.createFile(TypedFile.AUDIO, audio)
            const picturePath = await this.fileService.createFile(TypedFile.PICTURE, picture)
            const track = await this.trackModel.create({...dto, audio: audioPath, picture: picturePath})
            const artist = await this.MusicRepository.findByIdAndUpdate(dto.id_artist, {$push: {musics: track._id}})
            await artist.save();
            return track;
        } catch (error) {
            console.log(error)
        }
    }
    async findAll() {
        const track = await this.trackModel.find();
        //mongoose.Types.ObjectId.isValid('your id here');
        return track;
    }
    async findOne(id: string) {
        if(!mongoose.Types.ObjectId.isValid(id)) return 'Ошибка'
        const track = await this.trackModel.findById(id)
        return track
    }
    async deleteTrack(id: mongoose.Schema.Types.ObjectId) {
        mongoose.Types.ObjectId.isValid('your id here');
        const track = await this.trackModel.findByIdAndDelete(id)
        return track
    }
    /*async downloadFile(imagename: any, res) {
        const pathFile = 'http://localhost:3000/' + imagename
        const file = res.sendFile(pathFile)
        console.log(file)
        return file;
    }*/
    async search(query: string) {
        try {
            mongoose.Types.ObjectId.isValid('your id here');
            const track = await this.trackModel.find({name: {$regex: new RegExp(query, 'i')}})
            return console.log(track);
        } catch (error) {
            console.log(error)
        }
    }
}