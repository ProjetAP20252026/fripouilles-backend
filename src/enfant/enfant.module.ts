import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnfantController } from './enfant.controller';
import { EnfantService } from './enfant.service';

@Module({
  imports: [PrismaModule],
  providers: [EnfantService],
  controllers: [EnfantController],
  exports: [EnfantService]
})
export class EnfantModule { }
