import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/track')
    searchAlbum(@Query('query') query: string) {
        return this.searchService.searchTrack(query)
    }
    @Get('/album')
    searchTrack(@Query('query') query: string) {
        return this.searchService.searchAlbum(query)
    }
}
