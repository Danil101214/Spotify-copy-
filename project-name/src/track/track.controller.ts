import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Res, Response, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createReadStream, createWriteStream } from 'fs';
import mongoose, { ObjectId } from 'mongoose';
import { join } from 'path';
import { of } from 'rxjs';
import { TrackDto } from './dto/track.dto';
import { Track } from './track.model';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) {}
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: TrackDto): Promise<Track> {
        try {
        console.log(files)
        const {picture, audio} = files
        return this.trackService.create(dto, picture[0], audio[0])    //Це у нас масив в яких тільки одна кількість, тому пишемо масив 0, [0].
        } catch (error) {
            console.log(error)
        }
    }
    @Get()
    findAll(): Promise<Track[]> {
        return this.trackService.findAll()
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.trackService.findOne(id)
    }
    @Delete(':id') 
    deleteTrack(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.trackService.deleteTrack(id)
    }
    /*@Get('file/:imagename')
    downloadFile(@Param('imagename') imagename, @Res() res) {
        return this.trackService.downloadFile(imagename, res)
    }*/
    @Get('search')
    search(@Query('query') query: string) {
        try {
            return this.trackService.search(query)
        } catch (error) {
            console.log(error)
        }
    }
}