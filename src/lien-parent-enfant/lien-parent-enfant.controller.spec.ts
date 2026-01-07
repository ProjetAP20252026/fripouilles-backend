import { Test, TestingModule } from '@nestjs/testing';
import { LienParentEnfantController } from './lien-parent-enfant.controller';

describe('LienParentEnfantController', () => {
  let controller: LienParentEnfantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LienParentEnfantController],
    }).compile();

    controller = module.get<LienParentEnfantController>(LienParentEnfantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
