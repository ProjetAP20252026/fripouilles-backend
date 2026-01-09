import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaieService {
  private readonly logger = new Logger(PaieService.name);

  constructor(private readonly prisma: PrismaService) { }
}
