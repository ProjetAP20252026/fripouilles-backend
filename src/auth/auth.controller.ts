import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CreateAssistanteDto } from 'src/assistante/dto/create-assistante.dto';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags("Authentification")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Connexion utilisateur' })
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({
        description: 'Connexion réussie',
        schema: {
            example: {
                message: 'Connexion réussie.',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        nom: 'Dupont',
                        prenom: 'Marie',
                        email: 'marie@example.com',
                        role: 'ASSISTANTE_MATERNELLE'
                    }
                }
            }
        }
    })
    @ApiNotFoundResponse({ description: 'Utilisateur inexistant' })
    @ApiConflictResponse({ description: 'Email ou mot de passe incorrect' })
    @ApiBadRequestResponse({ description: 'Données de connexion invalides' })
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.login(loginDto);

        res.cookie('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return result;
    }

    @Post('register/parent')
    @ApiOperation({ summary: 'Enregistrement d\'un nouveau parent' })
    @ApiBody({ type: CreateParentDto })
    @ApiOkResponse({
        description: 'Parent créé avec succès',
        schema: {
            example: {
                message: 'Parent créé avec succès',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: 1,
                        nom: 'Dupont',
                        prenom: 'Jean',
                        email: 'jean@example.com',
                        role: 'PARENT',
                        message: 'Profil parent créé avec succès'
                    }
                }
            }
        }
    })
    @ApiConflictResponse({ description: 'Un utilisateur avec cet email existe déjà' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async registerParent(@Body() createParentDto: CreateParentDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.createParent(createParentDto);

        res.cookie('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return result;
    }

    @Post('register/assistante')
    @ApiOperation({ summary: 'Enregistrement d\'une nouvelle assistante maternelle' })
    @ApiBody({ type: CreateAssistanteDto })
    @ApiOkResponse({
        description: 'Assistante créée avec succès',
        schema: {
            example: {
                message: 'Assistante créée avec succès',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                        id: 1,
                        nom: 'Martin',
                        prenom: 'Sophie',
                        email: 'sophie@example.com',
                        role: 'ASSISTANTE_MATERNELLE',
                        message: 'Profil assistante créé avec succès'
                    }
                }
            }
        }
    })
    @ApiConflictResponse({ description: 'Un utilisateur avec cet email existe déjà' })
    @ApiBadRequestResponse({ description: 'Données invalides' })
    async registerAssistante(@Body() createAssistanteDto: CreateAssistanteDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.createAssistante(createAssistanteDto);

        res.cookie('accessToken', result.data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return result;
    }
}
