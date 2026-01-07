import { Test, TestingModule } from '@nestjs/testing';
import { AssistanteService } from './assistante.service';

describe('AssistanteService', () => {
  let service: AssistanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistanteService],
    }).compile();

    service = module.get<AssistanteService>(AssistanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
