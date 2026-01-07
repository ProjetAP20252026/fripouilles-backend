import { Test, TestingModule } from '@nestjs/testing';
import { LienParentEnfantService } from './lien-parent-enfant.service';

describe('LienParentEnfantService', () => {
  let service: LienParentEnfantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LienParentEnfantService],
    }).compile();

    service = module.get<LienParentEnfantService>(LienParentEnfantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
