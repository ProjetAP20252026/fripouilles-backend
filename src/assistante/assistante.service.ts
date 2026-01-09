import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssistanteDto } from './dto/create-assistante.dto';
import { UpdateAssistanteDto } from './dto/update-assistante.dto';

@Injectable()
export class AssistanteService {
    private readonly logger = new Logger(AssistanteService.name);

    constructor(private readonly prisma: PrismaService) { }

    async fetchProfil(userId: number) {
        const assistante = await this.prisma.utilisateur.findUnique({
            where: { id: userId },
            include: {
                assistanteProfil: true
            }
        });

        if (!assistante) {
            this.logger.error(`Assistante non trouvée avec cet ID: ${userId}`);
            throw new NotFoundException('Assistante non trouvée');
        }

        return {
            id: assistante.id,
            nom: assistante.nom,
            prenom: assistante.prenom,
            telephone: assistante.telephone,
            email: assistante.email,
            role: assistante.role,
            assistanteProfil: assistante.assistanteProfil
        }
    };

    async createProfil(createAssistanteDto: CreateAssistanteDto, password: string) {
        const existingByEmail = await this.prisma.utilisateur.findUnique({ where: { email: createAssistanteDto.email } });

        if (existingByEmail) {
            this.logger.error(`Un utilisateur avec cet email existe déjà: ${createAssistanteDto.email}`);
            throw new ConflictException('Un utilisateur avec cet email existe déjà.');
        }

        const existingByNumero = await this.prisma.assistanteProfil.findUnique({ where: { numeroAgrement: createAssistanteDto.numeroAgrement } });

        if (existingByNumero) {
            this.logger.error(`Une assistante avec ce numéro d'agrément existe déjà: ${createAssistanteDto.numeroAgrement}`);
            throw new ConflictException("Une assistante avec ce numéro d'agrément existe déjà.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const assistante = await this.prisma.utilisateur.create({
            data: {
                nom: createAssistanteDto.nom,
                prenom: createAssistanteDto.prenom,
                telephone: createAssistanteDto.telephone,
                email: createAssistanteDto.email,
                password: hashedPassword,
                role: Role.ASSISTANTE_MATERNELLE,
                assistanteProfil: {
                    create: {
                        numeroAgrement: createAssistanteDto.numeroAgrement,
                        dateObtentionAgrement: new Date(createAssistanteDto.dateObtentionAgrement),
                        agrementValide: createAssistanteDto.agrementValide,
                        dateFinAgrement: createAssistanteDto.dateFinAgrement ? new Date(createAssistanteDto.dateFinAgrement) : null,
                        capaciteAccueil: createAssistanteDto.capaciteAccueil,
                        adresse: createAssistanteDto.adresse,
                        codePostal: createAssistanteDto.codePostal,
                        ville: createAssistanteDto.ville,
                        experience: createAssistanteDto.experience,
                        disponibilites: createAssistanteDto.disponibilites ?? '',
                    }
                }
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                telephone: true,
                email: true,
                role: true,
                assistanteProfil: true,
            }
        });

        return {
            message: 'Profil assistante créé avec succès',
            ...assistante,
        };
    }

    async updateProfile(userId: number, updateAssistanteDto: UpdateAssistanteDto) {
        const existingAssistante = await this.prisma.utilisateur.findUnique({
            where: { id: userId },
            include: { assistanteProfil: true }
        });

        if (!existingAssistante || !existingAssistante.assistanteProfil) {
            this.logger.error(`Assistante non trouvée avec cet ID: ${userId}`);
            throw new NotFoundException('Assistante non trouvée');
        }

        // Mettre à jour les informations utilisateur
        await this.prisma.utilisateur.update({
            where: { id: userId },
            data: {
                nom: updateAssistanteDto.nom,
                prenom: updateAssistanteDto.prenom,
                telephone: updateAssistanteDto.telephone,
                email: updateAssistanteDto.email,
            }
        });

        // Mettre à jour le profil assistante
        await this.prisma.assistanteProfil.update({
            where: { utilisateurId: userId },
            data: {
                numeroAgrement: updateAssistanteDto.numeroAgrement,
                dateObtentionAgrement: updateAssistanteDto.dateObtentionAgrement,
                agrementValide: updateAssistanteDto.agrementValide,
                dateFinAgrement: updateAssistanteDto.dateFinAgrement,
                capaciteAccueil: updateAssistanteDto.capaciteAccueil,
                adresse: updateAssistanteDto.adresse,
                codePostal: updateAssistanteDto.codePostal,
                ville: updateAssistanteDto.ville,
                experience: updateAssistanteDto.experience,
                disponibilites: updateAssistanteDto.disponibilites,
            }
        });

        return {
            message: 'Profil assistante mis à jour avec succès',
        };
    }

    async findAll() {
        const assistantes = await this.prisma.utilisateur.findMany({
            where: { role: Role.ASSISTANTE_MATERNELLE },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                telephone: true,
                role: true,
                createdAt: true,
                assistanteProfil: {
                    select: {
                        id: true,
                        numeroAgrement: true,
                        dateObtentionAgrement: true,
                        agrementValide: true,
                        dateFinAgrement: true,
                        capaciteAccueil: true,
                        adresse: true,
                        codePostal: true,
                        ville: true,
                        experience: true,
                        disponibilites: true
                    }
                }
            }
        });

        return assistantes;
    }
}
