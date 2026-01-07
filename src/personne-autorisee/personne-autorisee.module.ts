import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PersonneAutoriseeController } from './personne-autorisee.controller';
import { PersonneAutoriseeService } from './personne-autorisee.service';

@Module({
  imports: [PrismaModule],
  controllers: [PersonneAutoriseeController],
  providers: [PersonneAutoriseeService],
  exports: [PersonneAutoriseeService]
})
export class PersonneAutoriseeModule { }
