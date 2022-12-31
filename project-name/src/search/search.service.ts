import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MusicDocument, MusicSort } from 'src/music-sort/Model/Model';
import { Track, TrackDocument } from 'src/track/track.model';

@Injectable()
export class SearchService {
    constructor(@InjectModel(Track.name) private TrackRepository: Model<TrackDocument>,
    @InjectModel(MusicSort.name) private MusicSortRepository: Model<MusicDocument>) {}

    async searchTrack(query: string) {
        const track = await this.TrackRepository.find({name: {$regex: new RegExp(query)}})
        return track
    }
    async searchAlbum(query: string) {
        const album = await this.MusicSortRepository.find({artist: {$regex: new RegExp(query)}})
        return album
    }
}
