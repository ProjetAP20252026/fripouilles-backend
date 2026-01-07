import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';

@Module({
  imports: [PrismaModule],
  controllers: [ParentController],
  providers: [ParentService, PrismaService, Logger],
  exports: [ParentService]
})
export class ParentModule { }
