import { forwardRef, Module } from '@nestjs/common';
import { MusicSortModule } from 'src/music-sort/music-sort.module';
import { TrackModule } from 'src/track/track.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => MusicSortModule)],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
