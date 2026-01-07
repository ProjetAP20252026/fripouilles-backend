import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnfantDto } from './dto/create-enfant.dto';
import { CreateLienParentEnfantDto } from './dto/create-lien-parent-enfant.dto';
import { UpdateEnfantDto } from './dto/update-enfant.dto';
import { UpdateLienParentEnfantDto } from './dto/update-lien-parent-enfant.dto';

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
                ...(updateEnfantDto.nom && { nom: updateEnfantDto.nom }),
                ...(updateEnfantDto.prenom && { prenom: updateEnfantDto.prenom }),
                ...(updateEnfantDto.dateNaissance && { dateNaissance: new Date(updateEnfantDto.dateNaissance) }),
                ...(updateEnfantDto.sexe && { sexe: updateEnfantDto.sexe }),
                ...(updateEnfantDto.allergies !== undefined && { allergies: updateEnfantDto.allergies || null }),
                ...(updateEnfantDto.remarquesMedicales !== undefined && { remarquesMedicales: updateEnfantDto.remarquesMedicales || null }),
                ...(updateEnfantDto.medecinTraitant !== undefined && { medecinTraitant: updateEnfantDto.medecinTraitant || null }),
                ...(updateEnfantDto.medecinTraitantTel !== undefined && { medecinTraitantTel: updateEnfantDto.medecinTraitantTel || null }),
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

    // Gestion des liens parent-enfant
    async createLien(createLienDto: CreateLienParentEnfantDto) {
        const parent = await this.prisma.parentProfil.findUnique({
            where: { id: createLienDto.parentId }
        });

        if (!parent) {
            this.logger.error(`Parent non trouvé avec cet ID: ${createLienDto.parentId}`);
            throw new NotFoundException('Parent non trouvé');
        }

        const enfant = await this.prisma.enfant.findUnique({
            where: { id: createLienDto.enfantId }
        });

        if (!enfant) {
            this.logger.error(`Enfant non trouvé avec cet ID: ${createLienDto.enfantId}`);
            throw new NotFoundException('Enfant non trouvé');
        }

        // Vérifier si le lien existe déjà
        const existingLien = await this.prisma.lienParentEnfant.findUnique({
            where: {
                parentId_enfantId: {
                    parentId: createLienDto.parentId,
                    enfantId: createLienDto.enfantId
                }
            }
        });

        if (existingLien) {
            this.logger.error(`Un lien existe déjà entre ce parent et cet enfant`);
            throw new ConflictException('Un lien existe déjà entre ce parent et cet enfant');
        }

        const lien = await this.prisma.lienParentEnfant.create({
            data: {
                parentId: createLienDto.parentId,
                enfantId: createLienDto.enfantId,
                estResponsableLegal: createLienDto.estResponsableLegal ?? true,
            },
            include: {
                parent: true,
                enfant: true
            }
        });

        return {
            message: 'Lien parent-enfant créé avec succès',
            ...lien
        };
    }

    async findAllLiens(enfantId?: number, parentId?: number) {
        const where: any = {};

        if (enfantId) {
            where.enfantId = enfantId;
        }

        if (parentId) {
            where.parentId = parentId;
        }

        return await this.prisma.lienParentEnfant.findMany({
            where,
            include: {
                parent: true,
                enfant: true
            }
        });
    }

    async findOneLien(id: number) {
        const lien = await this.prisma.lienParentEnfant.findUnique({
            where: { id },
            include: {
                parent: true,
                enfant: true
            }
        });

        if (!lien) {
            this.logger.error(`Lien parent-enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Lien parent-enfant non trouvé');
        }

        return lien;
    }

    async updateLien(id: number, updateLienDto: UpdateLienParentEnfantDto) {
        const existingLien = await this.prisma.lienParentEnfant.findUnique({
            where: { id }
        });

        if (!existingLien) {
            this.logger.error(`Lien parent-enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Lien parent-enfant non trouvé');
        }

        const lien = await this.prisma.lienParentEnfant.update({
            where: { id },
            data: {
                ...(updateLienDto.estResponsableLegal !== undefined && { estResponsableLegal: updateLienDto.estResponsableLegal }),
            },
            include: {
                parent: true,
                enfant: true
            }
        });

        return {
            message: 'Lien parent-enfant mis à jour avec succès',
            ...lien
        };
    }

    async removeLien(id: number) {
        const existingLien = await this.prisma.lienParentEnfant.findUnique({
            where: { id }
        });

        if (!existingLien) {
            this.logger.error(`Lien parent-enfant non trouvé avec cet ID: ${id}`);
            throw new NotFoundException('Lien parent-enfant non trouvé');
        }

        await this.prisma.lienParentEnfant.delete({
            where: { id }
        });

        return {
            message: 'Lien parent-enfant supprimé avec succès'
        };
    }
}
