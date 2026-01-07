import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AssistanteController } from './assistante.controller';
import { AssistanteService } from './assistante.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssistanteController],
  providers: [AssistanteService, PrismaModule, Logger],
  exports: [AssistanteService]
})
export class AssistanteModule { }
