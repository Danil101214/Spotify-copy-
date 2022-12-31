import { Module } from '@nestjs/common';
import { FileMusicArtistService } from './file-music-artist.service';

@Module({
  providers: [FileMusicArtistService],
  exports: [
    FileMusicArtistModule
  ]
})
export class FileMusicArtistModule {}
