import { Test, TestingModule } from '@nestjs/testing';
import { FileMusicArtistService } from './file-music-artist.service';

describe('FileMusicArtistService', () => {
  let service: FileMusicArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileMusicArtistService],
    }).compile();

    service = module.get<FileMusicArtistService>(FileMusicArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
