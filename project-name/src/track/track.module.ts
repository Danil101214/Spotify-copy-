import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './track.model';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FileService } from 'src/File/File.Service';
import { FileModule } from 'src/File/File.Module';
import { MusicSortModule } from 'src/music-sort/music-sort.module';
import { MusicSortService } from 'src/music-sort/music-sort.service';
import { MusicSortController } from 'src/music-sort/music-sort.controller';
import { FileMusicArtistModule } from 'src/file-music-artist/file-music-artist.module';
import { UsersModule } from 'src/users/users.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  providers: [TrackService, FileService],
  imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]), 
  FileModule, forwardRef(() => MusicSortModule), FileMusicArtistModule, forwardRef(() => UsersModule),
  forwardRef(() => SearchModule)],
  controllers: [TrackController],
  exports: [
    MongooseModule
  ]
})
export class TrackModule {}