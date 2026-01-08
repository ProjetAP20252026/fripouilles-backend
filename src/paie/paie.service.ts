import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StatutValidation } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaieDto } from './dto/create-paie.dto';
import { UpdatePaieDto } from './dto/update-paie.dto';

const CHARGES_SALARIALES_TAUX = 0.22;
const CHARGES_PATRONALES_TAUX = 0.42;

@Injectable()
export class PaieService {
  private readonly logger = new Logger(PaieService.name);

  constructor(private readonly prisma: PrismaService) { }

  async create(createDto: CreatePaieDto) {
    // const contrat = await this.prisma.contratGarde.findUnique({
    //   where: { id: createDto.contratGardeId },
    // });

    // if (!contrat) {
    //   throw new NotFoundException('Contrat de garde introuvable');
    // }

    // const { start, end } = this.getMonthRange(createDto.annee, createDto.mois);

    // const suivis = await this.prisma.suiviGardeAssistante.findMany({
    //   where: {
    //     assistanteId: contrat.assistanteId,
    //     date: { gte: start, lte: end },
    //     statutValidation: StatutValidation.VALIDE,
    //   },
    // });

    // const hours = this.computeHours(suivis);
    // const indemniteEntretien = contrat.indemniteEntretien * hours.joursPresence;
    // const indemniteRepas = contrat.indemniteRepas * hours.repas;
    // const indemniteKm = (contrat.indemniteKm ?? 0) * hours.totalKm;

    // const salaireBrutBase = contrat.tarifHoraireBrut * (hours.heuresNormales + hours.heuresMajorees);
    // const chargesSalariales = salaireBrutBase * CHARGES_SALARIALES_TAUX;
    // const chargesPatronales = salaireBrutBase * CHARGES_PATRONALES_TAUX;
    // const salaireNetAPayer = salaireBrutBase - chargesSalariales + indemniteEntretien + indemniteRepas + indemniteKm;

    // const payload: Prisma.PaieCreateInput = {
    //   contratGarde: { connect: { id: createDto.contratGardeId } },
    //   mois: createDto.mois,
    //   annee: createDto.annee,
    //   nombreHeuresNormales: hours.heuresNormales,
    //   nombreHeuresMajorees: hours.heuresMajorees,
    //   nombreJoursPresence: hours.joursPresence,
    //   nombreRepas: hours.repas,
    //   montantIndemniteEntretien: indemniteEntretien,
    //   montantIndemniteRepas: indemniteRepas,
    //   montantIndemniteKm: indemniteKm,
    //   salaireBrutBase,
    //   salaireNetAPayer,
    //   chargesPatronales,
    //   chargesSalariales,
    //   commentaire: createDto.commentaire ?? null,
    // };

    // try {
    //   const paie = await this.prisma.paie.create({ data: payload });
    //   return { message: 'Paie générée avec succès', ...paie };
    // } catch (error: any) {
    //   if (error.code === 'P2002') {
    //     throw new ConflictException('Une paie existe déjà pour ce contrat et ce mois');
    //   }
    //   this.logger.error('Erreur lors de la création de la paie', error?.message);
    //   throw error;
    // }
  }

  async findAll() {
    // return this.prisma.paie.findMany({
    //   include: {
    //     contratGarde: true,
    //   },
    // });
  }

  async findOne(id: number) {
    // const paie = await this.prisma.paie.findUnique({
    //   where: { id },
    //   include: { contratGarde: true },
    // });
    // if (!paie) {
    //   throw new NotFoundException('Paie non trouvée');
    // }
    // return paie;
  }

  async update(id: number, updateDto: UpdatePaieDto) {
    // await this.ensureExists(id);
    // const paie = await this.prisma.paie.update({
    //   where: { id },
    //   data: {
    //     commentaire: updateDto.commentaire,
    //   },
    // });
    // return { message: 'Paie mise à jour', ...paie };
  }

  async remove(id: number) {
    // await this.ensureExists(id);
    // await this.prisma.paie.delete({ where: { id } });
    // return { message: 'Paie supprimée avec succès' };
  }

  private getMonthRange(annee: number, mois: number) {
    // const start = new Date(Date.UTC(annee, mois - 1, 1, 0, 0, 0));
    // const end = new Date(Date.UTC(annee, mois, 0, 23, 59, 59));
    // return { start, end };
  }

  private computeHours(suivis: Array<{ heureArriveeReelle: Date | null; heureDepartReelle: Date | null; repasFournis: number; kilometresParcourus: number | null; }>) {
    // let heuresNormales = 0;
    // let heuresMajorees = 0; // à ajuster si règles d'heures sup
    // let joursPresence = 0;
    // let repas = 0;
    // let totalKm = 0;

    // for (const suivi of suivis) {
    //   if (suivi.heureArriveeReelle && suivi.heureDepartReelle) {
    //     const diffMs = suivi.heureDepartReelle.getTime() - suivi.heureArriveeReelle.getTime();
    //     if (diffMs > 0) {
    //       const hours = diffMs / (1000 * 60 * 60);
    //       heuresNormales += hours;
    //       joursPresence += 1;
    //     }
    //   }
    //   repas += suivi.repasFournis;
    //   totalKm += suivi.kilometresParcourus ?? 0;
    // }

    // return { heuresNormales, heuresMajorees, joursPresence, repas, totalKm };
  }

  private async ensureExists(id: number) {
    // const exists = await this.prisma.paie.findUnique({ where: { id } });
    // if (!exists) {
    //   throw new NotFoundException('Paie non trouvée');
    // }
  }
}
