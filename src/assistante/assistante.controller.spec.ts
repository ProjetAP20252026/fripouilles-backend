import { Test, TestingModule } from '@nestjs/testing';
import { AssistanteController } from './assistante.controller';

describe('AssistanteController', () => {
  let controller: AssistanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistanteController],
    }).compile();

    controller = module.get<AssistanteController>(AssistanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
