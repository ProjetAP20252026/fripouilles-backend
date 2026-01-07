import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Injectable()
export class ParentService {
    private readonly logger = new Logger(ParentService.name);

    constructor(private readonly prisma: PrismaService) { }

    async fetchProfil(userId: number) {
        const parent = await this.prisma.utilisateur.findUnique({
            where: { id: userId },
            include: {
                parentProfil: {
                    include: {
                        liensEnfants: {
                            include: {
                                enfant: true
                            }
                        }
                    }
                }
            }
        });

        if (!parent) {
            this.logger.error(`Parent non trouvé: ${userId}`);
            throw new NotFoundException('Profil parent non trouvé');
        }

        return {
            id: parent.id,
            nom: parent.nom,
            prenom: parent.prenom,
            telephone: parent.telephone,
            email: parent.email,
            role: parent.role,
            parentProfil: parent.parentProfil
        }
    }

    async createProfil(createParentDto: CreateParentDto, password: string) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const parent = await this.prisma.utilisateur.create({
            data: {
                nom: createParentDto.nom,
                prenom: createParentDto.prenom,
                telephone: createParentDto.telephone,
                email: createParentDto.email,
                password: hashedPassword,
                role: Role.PARENT,
                parentProfil: {
                    create: {
                        adresse: createParentDto.adresse,
                        codePostal: createParentDto.codePostal,
                        ville: createParentDto.ville,
                        situationFamiliale: createParentDto.situationFamiliale,
                        profession: createParentDto.profession,
                        employeur: createParentDto.employeur,
                        numeroAllocataire: createParentDto.numeroAllocataire,
                        beneficiaireCAF: createParentDto.beneficiaireCAF,
                        numeroCAF: createParentDto.numeroCAF,
                        contactUrgenceNom: createParentDto.contactUrgenceNom,
                        contactUrgenceTel: createParentDto.contactUrgenceTel
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
                parentProfil: true,
            }
        })

        return {
            message: 'Profil parent créé avec succès',
            ...parent,
        };
    }

    async updateProfile(userId: number, updateParentDto: UpdateParentDto) {
        const existingParent = await this.prisma.utilisateur.findUnique({
            where: { id: userId },
            include: { parentProfil: true }
        });

        if (!existingParent || !existingParent.parentProfil) {
            this.logger.error(`Parent non trouvé pour la mise à jour: ${userId}`);
            throw new NotFoundException('Parent non trouvé');
        };

        const parent = await this.prisma.parentProfil.update({
            where: { utilisateurId: userId },
            data: {
                adresse: updateParentDto.adresse,
                codePostal: updateParentDto.codePostal,
                ville: updateParentDto.ville,
                situationFamiliale: updateParentDto.situationFamiliale,
                profession: updateParentDto.profession,
                employeur: updateParentDto.employeur,
                numeroAllocataire: updateParentDto.numeroAllocataire,
                beneficiaireCAF: updateParentDto.beneficiaireCAF,
                numeroCAF: updateParentDto.numeroCAF,
                contactUrgenceNom: updateParentDto.contactUrgenceNom,
                contactUrgenceTel: updateParentDto.contactUrgenceTel,
            }
        });

        if (!parent) {
            this.logger.error(`Échec de la mise à jour du profil parent: ${userId}`);
            throw new NotFoundException('Échec de la mise à jour du profil parent');
        };

        return {
            message: 'Profil parent mis à jour avec succès',
        }
    }
}
