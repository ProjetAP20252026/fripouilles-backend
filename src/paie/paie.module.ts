import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaieController } from './paie.controller';
import { PaieService } from './paie.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaieController],
  providers: [PaieService],
  exports: [PaieService],
})
export class PaieModule { }
