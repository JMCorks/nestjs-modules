import { Test, TestingModule } from '@nestjs/testing';
import { DbEntityHandlerService } from './db-entity-handler.service';

describe('DbEntityHandlerService', () => {
  let service: DbEntityHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbEntityHandlerService],
    }).compile();

    service = module.get<DbEntityHandlerService>(DbEntityHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
