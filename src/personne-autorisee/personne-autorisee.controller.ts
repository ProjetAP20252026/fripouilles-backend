import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseOptionalIntPipe } from 'src/common/pipes/parse-optional-int.pipe';
import { CreatePersonneAutoriseeDto } from './dto/create-personne-autorisee.dto';
import { UpdatePersonneAutoriseeDto } from './dto/update-personne-autorisee.dto';
import { PersonneAutoriseeService } from './personne-autorisee.service';

@ApiTags("Personne Autorisée")
@Controller('personne-autorisee')
export class PersonneAutoriseeController {
    constructor(private readonly personneAutoriseeService: PersonneAutoriseeService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Créer une nouvelle personne autorisée' })
    @ApiCreatedResponse({
        description: 'Personne autorisée créée avec succès',
        schema: {
            example: {
                message: 'Personne autorisée créée avec succès',
                id: 1,
                enfantId: 1,
                nom: 'Dupont',
                prenom: 'Marie',
                telephone: '0612345678',
                lienAvecEnfant: 'Grand-mère',
                autorisationEcrite: true,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T12:00:00.000Z',
                enfant: {
                    id: 1,
                    nom: 'Dupont',
                    prenom: 'Emma'
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Enfant non trouvé' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async create(@Body() createPersonneAutoriseeDto: CreatePersonneAutoriseeDto) {
        return this.personneAutoriseeService.create(createPersonneAutoriseeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer les personnes autorisées' })
    @ApiQuery({ name: 'enfantId', required: false, type: Number, description: 'Filtrer par ID de l\'enfant' })
    @ApiOkResponse({
        description: 'Personnes autorisées récupérées avec succès',
        schema: {
            example: [
                {
                    id: 1,
                    enfantId: 1,
                    nom: 'Dupont',
                    prenom: 'Marie',
                    telephone: '0612345678',
                    lienAvecEnfant: 'Grand-mère',
                    autorisationEcrite: true,
                    createdAt: '2025-12-30T12:00:00.000Z',
                    updatedAt: '2025-12-30T12:00:00.000Z',
                    enfant: {
                        id: 1,
                        nom: 'Dupont',
                        prenom: 'Emma'
                    }
                }
            ]
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    async findAll(@Query('enfantId', ParseOptionalIntPipe) enfantId?: number) {
        return this.personneAutoriseeService.findAll(enfantId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Récupérer les détails d\'une personne autorisée' })
    @ApiOkResponse({
        description: 'Détails de la personne autorisée récupérés avec succès',
        schema: {
            example: {
                id: 1,
                enfantId: 1,
                nom: 'Dupont',
                prenom: 'Marie',
                telephone: '0612345678',
                lienAvecEnfant: 'Grand-mère',
                autorisationEcrite: true,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T12:00:00.000Z',
                enfant: {
                    id: 1,
                    nom: 'Dupont',
                    prenom: 'Emma'
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Personne autorisée non trouvée' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.personneAutoriseeService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour une personne autorisée' })
    @ApiOkResponse({
        description: 'Personne autorisée mise à jour avec succès',
        schema: {
            example: {
                message: 'Personne autorisée mise à jour avec succès',
                id: 1,
                enfantId: 1,
                nom: 'Dupont',
                prenom: 'Marie',
                telephone: '0612345679',
                lienAvecEnfant: 'Grand-mère',
                autorisationEcrite: true,
                createdAt: '2025-12-30T12:00:00.000Z',
                updatedAt: '2025-12-30T15:30:00.000Z',
                enfant: {
                    id: 1,
                    nom: 'Dupont',
                    prenom: 'Emma'
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Personne autorisée non trouvée' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updatePersonneAutoriseeDto: UpdatePersonneAutoriseeDto) {
        return this.personneAutoriseeService.update(id, updatePersonneAutoriseeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer une personne autorisée' })
    @ApiOkResponse({
        description: 'Personne autorisée supprimée avec succès',
        schema: {
            example: { message: 'Personne autorisée supprimée avec succès' }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Personne autorisée non trouvée' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.personneAutoriseeService.remove(id);
    }
}
