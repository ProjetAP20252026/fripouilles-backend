import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotAssistanteGuard } from 'src/auth/guards/not-assistante.guard';
import { CreateEnfantDto } from './dto/create-enfant.dto';
import { UpdateEnfantDto } from './dto/update-enfant.dto';
import { EnfantService } from './enfant.service';

@Controller('enfant')
export class EnfantController {
    constructor(private readonly enfantService: EnfantService) { }

    @UseGuards(JwtAuthGuard, NotAssistanteGuard)
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
    @ApiForbiddenResponse({ description: 'Les assistantes maternelles ne peuvent pas créer d\'enfants' })
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
}
