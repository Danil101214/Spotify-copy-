import { Test, TestingModule } from '@nestjs/testing';
import { MusicSortController } from './music-sort.controller';

describe('MusicSortController', () => {
  let controller: MusicSortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicSortController],
    }).compile();

    controller = module.get<MusicSortController>(MusicSortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
