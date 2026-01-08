import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'generated/prisma/enums';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentService } from './parent.service';

@ApiTags('Parent')
@Controller('parent')
export class ParentController {
    constructor(private readonly parentService: ParentService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer le profil du parent connecté' })
    @ApiOkResponse({
        description: 'Profil parent récupéré avec succès',
        schema: {
            example: {
                id: 1,
                nom: 'Dupont',
                prenom: 'Jean',
                telephone: '0612345678',
                email: 'jean@example.com',
                role: 'PARENT',
                parentProfil: {
                    utilisateurId: 1,
                    adresse: '123 Rue de la Paix',
                    codePostal: '75000',
                    ville: 'Paris',
                    liensEnfants: []
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Profil parent non trouvé' })
    async fetchProfile(@User('sub') userId: number) {
        return this.parentService.fetchProfil(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('tous')
    @ApiOperation({ summary: 'Récupérer tous les parents (Admin uniquement)' })
    @ApiOkResponse({
        description: 'Liste des parents récupérée avec succès',
        schema: {
            example: [{
                id: 1,
                nom: 'Dupont',
                prenom: 'Jean',
                email: 'jean@example.com',
                telephone: '0612345678',
                role: 'PARENT',
                parentProfil: {
                    adresse: '123 Rue de la Paix',
                    ville: 'Paris'
                }
            }]
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
    async findAllParents() {
        return this.parentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiOperation({ summary: 'Mettre à jour le profil du parent' })
    @ApiOkResponse({
        description: 'Profil parent mis à jour avec succès',
        schema: {
            example: { message: 'Profil parent mis à jour avec succès' }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Parent non trouvé' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async updateProfile(@User('sub') userId: number, @Body() updateParentDto: UpdateParentDto) {
        return this.parentService.updateProfile(userId, updateParentDto);
    }
}
