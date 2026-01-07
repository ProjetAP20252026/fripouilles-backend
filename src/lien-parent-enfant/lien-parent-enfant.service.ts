import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLienParentEnfantDto } from './dto/create-lien-parent-enfant.dto';
import { UpdateLienParentEnfantDto } from './dto/update-lien-parent-enfant.dto';

@Injectable()
export class LienParentEnfantService {
    private readonly logger = new Logger(LienParentEnfantService.name);

    constructor(private readonly prisma: PrismaService) { }

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
