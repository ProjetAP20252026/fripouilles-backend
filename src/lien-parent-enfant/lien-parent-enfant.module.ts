import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LienParentEnfantController } from './lien-parent-enfant.controller';
import { LienParentEnfantService } from './lien-parent-enfant.service';

@Module({
  imports: [PrismaModule],
  controllers: [LienParentEnfantController],
  providers: [LienParentEnfantService]
})
export class LienParentEnfantModule { }
