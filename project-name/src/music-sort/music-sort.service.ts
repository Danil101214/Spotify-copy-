import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { FileMusicArtistService, TypeFile } from 'src/file-music-artist/file-music-artist.service';
import { FileService } from 'src/File/File.Service';
import { Track, TrackDocument } from 'src/track/track.model';
import { MusicSortDto } from './dto/MusicSort.dto';
import { MusicDocument, MusicSort } from './Model/Model';

@Injectable()
export class MusicSortService {
    constructor(@InjectModel(MusicSort.name) private MusicRepository: Model<MusicDocument>,
    private fileService: FileMusicArtistService, @InjectModel(Track.name) private TrackRepository: Model<TrackDocument>) {}
    async create(dto: MusicSortDto, picture): Promise<MusicSort> {
        mongoose.Types.ObjectId.isValid('your id here');
        const picturePath = await this.fileService.createFile(TypeFile.ARTIST_PICTURE, picture)
        const musicArtist = await this.MusicRepository.create({...dto, picture: picturePath});
        return musicArtist;
    }
    async getAll(count: number = 10, offset: number = 0) {
        mongoose.Types.ObjectId.isValid('your id here');
        const music = await this.MusicRepository.find().skip(offset).limit(count)
        return music;
    }

    async getOne(id: ObjectId) {
        mongoose.Types.ObjectId.isValid('your id here');
        const musicId = await this.MusicRepository.findById(id)
        const musicsGroup = await Promise.all(
            musicId.musics.map(mus => {
                return this.TrackRepository.findById(mus)
            })
        )
        return {
            music: musicId,
            musicsGroup: musicsGroup
        }
    }
}