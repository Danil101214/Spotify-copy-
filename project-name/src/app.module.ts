import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TrackModule } from './track/track.module';
import { FileModule } from './File/File.Module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MusicSortModule } from './music-sort/music-sort.module';
import { FileMusicArtistModule } from './file-music-artist/file-music-artist.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [UsersModule, 
    MongooseModule.forRoot('mongodb+srv://Danil:10203040@cluster0.x5uxv56.mongodb.net/?retryWrites=true&w=majority'), 
    RolesModule, TrackModule, FileModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }), MusicSortModule, FileMusicArtistModule, SearchModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}