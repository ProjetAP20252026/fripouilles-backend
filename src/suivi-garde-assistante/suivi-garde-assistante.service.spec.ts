import { Test, TestingModule } from '@nestjs/testing';
import { SuiviGardeAssistanteService } from './suivi-garde-assistante.service';

describe('SuiviGardeAssistanteService', () => {
  let service: SuiviGardeAssistanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuiviGardeAssistanteService],
    }).compile();

    service = module.get<SuiviGardeAssistanteService>(SuiviGardeAssistanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
