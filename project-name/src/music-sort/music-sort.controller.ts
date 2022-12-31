import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors, Param, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { MusicSortDto } from './dto/MusicSort.dto';
import { MusicSort } from './Model/Model';
import { MusicSortService } from './music-sort.service';

@Controller('music-sort')
export class MusicSortController {
    constructor(private musicSortService: MusicSortService) {}
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: MusicSortDto): Promise<MusicSort> {
        const {picture} = files
        return this.musicSortService.create(dto, picture[0])
    }
    @Get('/')
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.musicSortService.getAll(count, offset)
    }
    @Get('/:id')
    getOne(@Param('id') id: ObjectId) {
        return this.musicSortService.getOne(id)
    }
}