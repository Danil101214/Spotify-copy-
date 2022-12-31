import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileMusicArtistModule } from 'src/file-music-artist/file-music-artist.module';
import { FileMusicArtistService } from 'src/file-music-artist/file-music-artist.service';
import { SearchModule } from 'src/search/search.module';
import { TrackModule } from 'src/track/track.module';
import { MusicSort, MusicSortSchema } from './Model/Model';
import { MusicSortController } from './music-sort.controller';
import { MusicSortService } from './music-sort.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MusicSort.name, schema: MusicSortSchema },
      ]), FileMusicArtistModule, forwardRef(() => TrackModule), forwardRef(() => SearchModule)
  ],
  controllers: [MusicSortController],
  providers: [MusicSortService, FileMusicArtistService],
  exports: [
    MusicSortModule,
    MongooseModule
  ]
})
export class MusicSortModule {}