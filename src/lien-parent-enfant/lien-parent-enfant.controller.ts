import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateLienParentEnfantDto } from './dto/create-lien-parent-enfant.dto';
import { UpdateLienParentEnfantDto } from './dto/update-lien-parent-enfant.dto';
import { LienParentEnfantService } from './lien-parent-enfant.service';

@ApiTags("Lien parent-enfant")
@Controller('lien-parent-enfant')
export class LienParentEnfantController {
    constructor(private readonly lienParentEnfantService: LienParentEnfantService) { }

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
        return this.lienParentEnfantService.createLien(createLienDto);
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
        return this.lienParentEnfantService.findAllLiens(
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
        return this.lienParentEnfantService.findOneLien(parseInt(id));
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
        return this.lienParentEnfantService.updateLien(parseInt(id), updateLienDto);
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
        return this.lienParentEnfantService.removeLien(parseInt(id));
    }
}
