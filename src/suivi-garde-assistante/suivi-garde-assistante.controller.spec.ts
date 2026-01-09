import { Test, TestingModule } from '@nestjs/testing';
import { SuiviGardeAssistanteController } from './suivi-garde-assistante.controller';
import { SuiviGardeAssistanteService } from './suivi-garde-assistante.service';

describe('SuiviGardeAssistanteController', () => {
  let controller: SuiviGardeAssistanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuiviGardeAssistanteController],
      providers: [SuiviGardeAssistanteService],
    }).compile();

    controller = module.get<SuiviGardeAssistanteController>(SuiviGardeAssistanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
