import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonneAutoriseeDto } from './dto/create-personne-autorisee.dto';
import { UpdatePersonneAutoriseeDto } from './dto/update-personne-autorisee.dto';

@Injectable()
export class PersonneAutoriseeService {
    private readonly logger = new Logger(PersonneAutoriseeService.name);

    constructor(private readonly prisma: PrismaService) { }

    async create(createPersonneAutoriseeDto: CreatePersonneAutoriseeDto) {
        const enfant = await this.prisma.enfant.findUnique({
            where: { id: createPersonneAutoriseeDto.enfantId }
        });

        if (!enfant) {
            this.logger.error(`Enfant non trouvé avec cet ID: ${createPersonneAutoriseeDto.enfantId}`);
            throw new NotFoundException('Enfant non trouvé');
        }

        const personneAutorisee = await this.prisma.personneAutorisee.create({
            data: {
                enfantId: createPersonneAutoriseeDto.enfantId,
                nom: createPersonneAutoriseeDto.nom,
                prenom: createPersonneAutoriseeDto.prenom,
                telephone: createPersonneAutoriseeDto.telephone,
                lienAvecEnfant: createPersonneAutoriseeDto.lienAvecEnfant,
                autorisationEcrite: createPersonneAutoriseeDto.autorisationEcrite,
            },
            include: {
                enfant: true
            }
        });

        return {
            message: 'Personne autorisée créée avec succès',
            ...personneAutorisee
        };
    }

    async findAll(enfantId?: number) {
        if (enfantId) {
            return await this.prisma.personneAutorisee.findMany({
                where: { enfantId },
                include: {
                    enfant: true
                }
            });
        }

        return await this.prisma.personneAutorisee.findMany({
            include: {
                enfant: true
            }
        });
    }

    async findOne(id: number) {
        const personneAutorisee = await this.prisma.personneAutorisee.findUnique({
            where: { id },
            include: {
                enfant: true
            }
        });

        if (!personneAutorisee) {
            this.logger.error(`Personne autorisée non trouvée avec cet ID: ${id}`);
            throw new NotFoundException('Personne autorisée non trouvée');
        }

        return personneAutorisee;
    }

    async update(id: number, updatePersonneAutoriseeDto: UpdatePersonneAutoriseeDto) {
        const existingPersonne = await this.prisma.personneAutorisee.findUnique({
            where: { id }
        });

        if (!existingPersonne) {
            this.logger.error(`Personne autorisée non trouvée avec cet ID: ${id}`);
            throw new NotFoundException('Personne autorisée non trouvée');
        }

        if (updatePersonneAutoriseeDto.enfantId) {
            const enfant = await this.prisma.enfant.findUnique({
                where: { id: updatePersonneAutoriseeDto.enfantId }
            });

            if (!enfant) {
                this.logger.error(`Enfant non trouvé avec cet ID: ${updatePersonneAutoriseeDto.enfantId}`);
                throw new NotFoundException('Enfant non trouvé');
            }
        }

        const personneAutorisee = await this.prisma.personneAutorisee.update({
            where: { id },
            data: {
                ...updatePersonneAutoriseeDto
            },
            include: {
                enfant: true
            }
        });

        return {
            message: 'Personne autorisée mise à jour avec succès',
            ...personneAutorisee
        };
    }

    async remove(id: number) {
        const existingPersonne = await this.prisma.personneAutorisee.findUnique({
            where: { id }
        });

        if (!existingPersonne) {
            this.logger.error(`Personne autorisée non trouvée avec cet ID: ${id}`);
            throw new NotFoundException('Personne autorisée non trouvée');
        }

        await this.prisma.personneAutorisee.delete({
            where: { id }
        });

        return {
            message: 'Personne autorisée supprimée avec succès'
        };
    }
}
