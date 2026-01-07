import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AssistanteService } from './assistante.service';
import { UpdateAssistanteDto } from './dto/update-assistante.dto';

@Controller('assistante')
export class AssistanteController {
    constructor(private readonly assistanteService: AssistanteService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Récupérer le profil de l\'assistante' })
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
    @Put(":id")
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
    async updateProfile(@Param("id") userId: number, @Body() updateAssistanteDto: UpdateAssistanteDto) {
        return this.assistanteService.updateProfile(userId, updateAssistanteDto);
    }
}
