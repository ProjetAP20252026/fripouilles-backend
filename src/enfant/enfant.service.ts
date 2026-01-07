import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnfantDto } from './dto/create-enfant.dto';
import { UpdateEnfantDto } from './dto/update-enfant.dto';

@Injectable()
export class EnfantService {
    private readonly logger = new Logger(EnfantService.name);

    constructor(private readonly prisma: PrismaService) { }

    async create(createEnfantDto: CreateEnfantDto) {
        const enfant = await this.prisma.enfant.create({
            data: {
                nom: createEnfantDto.nom,
                prenom: createEnfantDto.prenom,
                dateNaissance: new Date(createEnfantDto.dateNaissance),
                sexe: createEnfantDto.sexe,
                allergies: createEnfantDto.allergies || null,
                remarquesMedicales: createEnfantDto.remarquesMedicales || null,
                medecinTraitant: createEnfantDto.medecinTraitant || null,
                medecinTraitantTel: createEnfantDto.medecinTraitantTel || null,
            },
            include: {
                liensParents: {
                    include: {
                        parent: true
                    }
                }
            }
        });

        return {
            message: 'Enfant créé avec succès',
            ...enfant
        };
    }

    async findAll(parentId?: number) {
        if (parentId) {
            // Si parentId est fourni, retourner les enfants du parent
            const enfants = await this.prisma.enfant.findMany({
                where: {
                    liensParents: {
                        some: {
                            parentId
                        }
                    }
                },
                include: {
                    liensParents: {
                        include: {
                            parent: true
                        }
                    }
                }
            });

            return enfants;
        }

        // Sinon retourner tous les enfants
        return await this.prisma.enfant.findMany({
            include: {
                liensParents: {
                    include: {
                        parent: true
                    }
                }
            }
        });
    }

    async findOne(id: number) {
        const enfant = await this.prisma.enfant.findUnique({
            where: { id },
            include: {
                liensParents: {
                    include: {
                        parent: true
                    }
                },
                personnesAutorisees: true,
                contratsGarde: true,
                inscriptionsAtelier: true,
                inscriptionCreche: true,
                reservationsCreche: true,
                suivisJournalier: true
            }
        });

        if (!enfant) {
            this.logger.error(`Enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Enfant non trouvé');
        }

        return enfant;
    }

    async update(id: number, updateEnfantDto: UpdateEnfantDto) {
        const existingEnfant = await this.prisma.enfant.findUnique({
            where: { id }
        });

        if (!existingEnfant) {
            this.logger.error(`Enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Enfant non trouvé');
        }

        const enfant = await this.prisma.enfant.update({
            where: { id },
            data: {
                ...updateEnfantDto,
            },
            include: {
                liensParents: {
                    include: {
                        parent: true
                    }
                }
            }
        });

        return {
            message: 'Enfant mis à jour avec succès',
            ...enfant
        };
    }

    async remove(id: number) {
        const existingEnfant = await this.prisma.enfant.findUnique({
            where: { id }
        });

        if (!existingEnfant) {
            this.logger.error(`Enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Enfant non trouvé');
        }

        await this.prisma.enfant.delete({
            where: { id }
        });

        return {
            message: 'Enfant supprimé avec succès'
        };
    }
}
