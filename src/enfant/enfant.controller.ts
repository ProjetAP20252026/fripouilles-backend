import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateEnfantDto } from './dto/create-enfant.dto';
import { CreateLienParentEnfantDto } from './dto/create-lien-parent-enfant.dto';
import { UpdateEnfantDto } from './dto/update-enfant.dto';
import { UpdateLienParentEnfantDto } from './dto/update-lien-parent-enfant.dto';
import { EnfantService } from './enfant.service';

@Controller('enfant')
export class EnfantController {
    constructor(private readonly enfantService: EnfantService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Créer un nouvel enfant' })
    @ApiCreatedResponse({
        description: 'Enfant créé avec succès',
        schema: {
            example: {
                message: 'Enfant créé avec succès',
                id: 1,
                nom: 'Dupont',
                prenom: 'Emma',
                dateNaissance: '2020-05-15T00:00:00.000Z',
                sexe: 'FILLE',
                allergies: 'Arachides',
                remarquesMedicales: null,
                medecinTraitant: null,
                medecinTraitantTel: null,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T12:00:00.000Z',
                liensParents: []
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async create(@Body() createEnfantDto: CreateEnfantDto) {
        return this.enfantService.create(createEnfantDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer les enfants' })
    @ApiOkResponse({
        description: 'Enfants récupérés avec succès',
        schema: {
            example: [
                {
                    id: 1,
                    nom: 'Dupont',
                    prenom: 'Emma',
                    dateNaissance: '2020-05-15T00:00:00.000Z',
                    sexe: 'FILLE',
                    allergies: 'Arachides',
                    remarquesMedicales: null,
                    medecinTraitant: null,
                    medecinTraitantTel: null,
                    createdAt: '2025-12-30T12:00:00.000Z',
                    updatedAt: '2025-12-30T12:00:00.000Z',
                    liensParents: []
                }
            ]
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    async findAll(@Query('parentId') parentId?: string) {
        return this.enfantService.findAll(parentId ? parseInt(parentId) : undefined);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Récupérer les détails d\'un enfant' })
    @ApiOkResponse({
        description: 'Détails de l\'enfant récupérés avec succès',
        schema: {
            example: {
                id: 1,
                nom: 'Dupont',
                prenom: 'Emma',
                dateNaissance: '2020-05-15T00:00:00.000Z',
                sexe: 'FILLE',
                allergies: 'Arachides',
                remarquesMedicales: null,
                medecinTraitant: null,
                medecinTraitantTel: null,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T12:00:00.000Z',
                liensParents: [],
                personnesAutorisees: [],
                contratsGarde: [],
                inscriptionsAtelier: [],
                inscriptionCreche: null,
                reservationsCreche: [],
                suivisJournalier: []
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Enfant non trouvé' })
    async findOne(@Param('id') id: string) {
        return this.enfantService.findOne(parseInt(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un enfant' })
    @ApiOkResponse({
        description: 'Enfant mis à jour avec succès',
        schema: {
            example: {
                message: 'Enfant mis à jour avec succès',
                id: 1,
                nom: 'Dupont',
                prenom: 'Emma',
                dateNaissance: '2020-05-15T00:00:00.000Z',
                sexe: 'FILLE',
                allergies: 'Arachides, Noix',
                remarquesMedicales: null,
                medecinTraitant: null,
                medecinTraitantTel: null,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T15:30:00.000Z',
                liensParents: []
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Enfant non trouvé' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async update(@Param('id') id: string, @Body() updateEnfantDto: UpdateEnfantDto) {
        return this.enfantService.update(parseInt(id), updateEnfantDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un enfant' })
    @ApiOkResponse({
        description: 'Enfant supprimé avec succès',
        schema: {
            example: { message: 'Enfant supprimé avec succès' }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Enfant non trouvé' })
    async remove(@Param('id') id: string) {
        return this.enfantService.remove(parseInt(id));
    }

    // Routes pour la gestion des liens parent-enfant
    @UseGuards(JwtAuthGuard)
    @Post('lien')
    @ApiOperation({ summary: 'Créer un lien entre un parent et un enfant' })
    @ApiCreatedResponse({
        description: 'Lien parent-enfant créé avec succès',
        schema: {
            example: {
                message: 'Lien parent-enfant créé avec succès',
                id: 1,
                parentId: 1,
                enfantId: 1,
                estResponsableLegal: true,
                parent: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Sophie',
                },
                enfant: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Lucas',
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Parent ou enfant non trouvé' })
    @ApiConflictResponse({ description: 'Un lien existe déjà entre ce parent et cet enfant' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async createLien(@Body() createLienDto: CreateLienParentEnfantDto) {
        return this.enfantService.createLien(createLienDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('lien')
    @ApiOperation({ summary: 'Récupérer tous les liens parent-enfant' })
    @ApiQuery({ name: 'enfantId', required: false, type: Number, description: 'Filtrer par enfant' })
    @ApiQuery({ name: 'parentId', required: false, type: Number, description: 'Filtrer par parent' })
    @ApiOkResponse({
        description: 'Liste des liens parent-enfant',
        schema: {
            example: [{
                id: 1,
                parentId: 1,
                enfantId: 1,
                estResponsableLegal: true,
                parent: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Sophie',
                },
                enfant: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Lucas',
                }
            }]
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    async findAllLiens(@Query('enfantId') enfantId?: string, @Query('parentId') parentId?: string) {
        return this.enfantService.findAllLiens(
            enfantId ? parseInt(enfantId) : undefined,
            parentId ? parseInt(parentId) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('lien/:id')
    @ApiOperation({ summary: 'Récupérer un lien parent-enfant par son ID' })
    @ApiOkResponse({
        description: 'Détails du lien parent-enfant',
        schema: {
            example: {
                id: 1,
                parentId: 1,
                enfantId: 1,
                estResponsableLegal: true,
                parent: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Sophie',
                },
                enfant: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Lucas',
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Lien parent-enfant non trouvé' })
    async findOneLien(@Param('id') id: string) {
        return this.enfantService.findOneLien(parseInt(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put('lien/:id')
    @ApiOperation({ summary: 'Modifier un lien parent-enfant' })
    @ApiOkResponse({
        description: 'Lien parent-enfant mis à jour avec succès',
        schema: {
            example: {
                message: 'Lien parent-enfant mis à jour avec succès',
                id: 1,
                parentId: 1,
                enfantId: 1,
                estResponsableLegal: false,
                parent: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Sophie',
                },
                enfant: {
                    id: 1,
                    nom: 'Martin',
                    prenom: 'Lucas',
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Lien parent-enfant non trouvé' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async updateLien(@Param('id') id: string, @Body() updateLienDto: UpdateLienParentEnfantDto) {
        return this.enfantService.updateLien(parseInt(id), updateLienDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('lien/:id')
    @ApiOperation({ summary: 'Supprimer un lien parent-enfant' })
    @ApiOkResponse({
        description: 'Lien parent-enfant supprimé avec succès',
        schema: {
            example: { message: 'Lien parent-enfant supprimé avec succès' }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Lien parent-enfant non trouvé' })
    async removeLien(@Param('id') id: string) {
        return this.enfantService.removeLien(parseInt(id));
    }
}
