import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentService } from './parent.service';

@Controller('parent')
export class ParentController {
    constructor(private readonly parentService: ParentService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer le profil du parent' })
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

    @UseGuards(JwtAuthGuard)
    @Put(":id")
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
    async updateProfile(@Param("id") userId: number, @Body() updateParentDto: UpdateParentDto) {
        return this.parentService.updateProfile(userId, updateParentDto);
    }
}
