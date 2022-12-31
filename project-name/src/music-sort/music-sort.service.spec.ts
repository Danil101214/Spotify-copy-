import { Test, TestingModule } from '@nestjs/testing';
import { MusicSortService } from './music-sort.service';

describe('MusicSortService', () => {
  let service: MusicSortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicSortService],
    }).compile();

    service = module.get<MusicSortService>(MusicSortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
