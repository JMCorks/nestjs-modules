import { Test, TestingModule } from '@nestjs/testing';
import { SomeModelController } from './some-model.controller';

describe('SomeModel Controller', () => {
  let controller: SomeModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SomeModelController],
    }).compile();

    controller = module.get<SomeModelController>(SomeModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
