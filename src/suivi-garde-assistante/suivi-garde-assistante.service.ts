import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StatutValidation } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSuiviGardeAssistanteDto } from './dto/create-suivi-garde-assistante.dto';
import { UpdateSuiviGardeAssistanteDto } from './dto/update-suivi-garde-assistante.dto';
import { ValidateSuiviGardeAssistanteDto } from './dto/validate-suivi-garde-assistante.dto';

@Injectable()
export class SuiviGardeAssistanteService {
  private readonly logger = new Logger(SuiviGardeAssistanteService.name);

  constructor(private readonly prisma: PrismaService) { }

  async create(createDto: CreateSuiviGardeAssistanteDto) {
    const suivi = await this.prisma.suiviGardeAssistante.create({
      data: {
        assistanteId: createDto.assistanteId,
        date: new Date(createDto.date),
        heureArriveeReelle: createDto.heureArriveeReelle ? new Date(createDto.heureArriveeReelle) : null,
        heureDepartReelle: createDto.heureDepartReelle ? new Date(createDto.heureDepartReelle) : null,
        repasFournis: createDto.repasFournis,
        fraisDivers: createDto.fraisDivers ?? null,
        kilometresParcourus: createDto.kilometresParcourus ?? null,
        nombreEnfantsGarde: createDto.nombreEnfantsGarde,
        statutValidation: createDto.statutValidation ?? StatutValidation.EN_ATTENTE,
      },
    });

    return { message: 'Suivi créé avec succès', ...suivi };
  }

  async findAll() {
    return this.prisma.suiviGardeAssistante.findMany();
  }

  async findOne(id: number) {
    const suivi = await this.prisma.suiviGardeAssistante.findUnique({ where: { id } });
    if (!suivi) {
      throw new NotFoundException('Suivi non trouvé');
    }
    return suivi;
  }

  async update(id: number, updateDto: UpdateSuiviGardeAssistanteDto) {
    await this.ensureExists(id);

    const suivi = await this.prisma.suiviGardeAssistante.update({
      where: { id },
      data: {
        heureArriveeReelle: updateDto.heureArriveeReelle ? new Date(updateDto.heureArriveeReelle) : undefined,
        heureDepartReelle: updateDto.heureDepartReelle ? new Date(updateDto.heureDepartReelle) : undefined,
        repasFournis: updateDto.repasFournis,
        fraisDivers: updateDto.fraisDivers,
        kilometresParcourus: updateDto.kilometresParcourus,
        nombreEnfantsGarde: updateDto.nombreEnfantsGarde,
        statutValidation: updateDto.statutValidation,
      },
    });

    return { message: 'Suivi mis à jour', ...suivi };
  }

  async validate(id: number, validateDto: ValidateSuiviGardeAssistanteDto) {
    await this.ensureExists(id);

    const suivi = await this.prisma.suiviGardeAssistante.update({
      where: { id },
      data: {
        statutValidation: validateDto.statutValidation,
        dateValidation: new Date(),
        commentaireParent: validateDto.commentaireParent ?? null,
      },
    });

    return { message: 'Statut de validation mis à jour', ...suivi };
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.prisma.suiviGardeAssistante.delete({ where: { id } });
    return { message: 'Suivi supprimé avec succès' };
  }

  private async ensureExists(id: number) {
    const exists = await this.prisma.suiviGardeAssistante.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Suivi non trouvé');
    }
  }
}
