import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuiviGardeAssistanteController } from './suivi-garde-assistante.controller';
import { SuiviGardeAssistanteService } from './suivi-garde-assistante.service';

@Module({
  imports: [PrismaModule],
  controllers: [SuiviGardeAssistanteController],
  providers: [SuiviGardeAssistanteService],
  exports: [SuiviGardeAssistanteService],
})
export class SuiviGardeAssistanteModule { }
