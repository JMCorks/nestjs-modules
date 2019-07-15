import { Test, TestingModule } from '@nestjs/testing';
import { SomeModelService } from './some-model.service';

describe('SomeModelService', () => {
  let service: SomeModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SomeModelService],
    }).compile();

    service = module.get<SomeModelService>(SomeModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
