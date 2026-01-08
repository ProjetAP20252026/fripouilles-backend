import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AssistanteService } from './assistante.service';
import { UpdateAssistanteDto } from './dto/update-assistante.dto';

@ApiTags('Assistante')
@Controller('assistante')
export class AssistanteController {
    constructor(private readonly assistanteService: AssistanteService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer le profil de l\'assistante connectée' })
    @ApiOkResponse({
        description: 'Profil assistante récupéré avec succès',
        schema: {
            example: {
                id: 1,
                nom: 'Dupont',
                prenom: 'Marie',
                telephone: '0612345678',
                email: 'marie@example.com',
                role: 'ASSISTANTE_MATERNELLE',
                assistanteProfil: {
                    utilisateurId: 1,
                    numeroAgrement: 'AG123456',
                    dateObtentionAgrement: '2020-01-15',
                    agrementValide: true
                }
            }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Assistante non trouvée' })
    async fetchProfile(@User('sub') userId: number) {
        return this.assistanteService.fetchProfil(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('toutes')
    @ApiOperation({ summary: 'Récupérer toutes les assistantes maternelles disponibles' })
    @ApiOkResponse({
        description: 'Liste des assistantes récupérée avec succès',
        schema: {
            example: [{
                id: 1,
                nom: 'Dupont',
                prenom: 'Marie',
                email: 'marie@example.com',
                telephone: '0612345678',
                assistanteProfil: {
                    numeroAgrement: 'AG123456',
                    agrementValide: true,
                    capaciteAccueil: 4,
                    ville: 'Boulogne-sur-Mer',
                    disponibilites: 'Lundi-Vendredi 7h-18h'
                }
            }]
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    async findAllAssistantes() {
        return this.assistanteService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiOperation({ summary: 'Mettre à jour le profil de l\'assistante' })
    @ApiOkResponse({
        description: 'Profil assistante mis à jour avec succès',
        schema: {
            example: { message: 'Profil assistante mis à jour avec succès' }
        }
    })
    @ApiUnauthorizedResponse({ description: 'Authentification requise' })
    @ApiNotFoundResponse({ description: 'Assistante non trouvée' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async updateProfile(@User('sub') userId: number, @Body() updateAssistanteDto: UpdateAssistanteDto) {
        return this.assistanteService.updateProfile(userId, updateAssistanteDto);
    }
}
