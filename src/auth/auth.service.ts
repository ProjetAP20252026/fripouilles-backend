import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AssistanteService } from 'src/assistante/assistante.service';
import { CreateAssistanteDto } from 'src/assistante/dto/create-assistante.dto';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { ParentService } from 'src/parent/parent.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly parentService: ParentService,
        private readonly assistanteService: AssistanteService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.utilisateur.findUnique({
            where: { email },
            include: {
                parentProfil: true,
                assistanteProfil: true,
            }
        });

        if (!user) {
            this.logger.error(`Utilisateur inexistant: ${email}`);
            throw new NotFoundException('Utilisateur inexistant.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            this.logger.error(`Erreur lors de la connexion: ${email}`);
            throw new ConflictException('Erreur lors de la connexion.');
        }

        const accessToken = await this.jwtService.signAsync({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        return {
            message: 'Connexion réussie.',
            data: {
                accessToken,
                user: {
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    telephone: user.telephone,
                    role: user.role,
                    parentProfil: user.parentProfil,
                    assistanteProfil: user.assistanteProfil,
                }
            }
        }
    }

    async createParent(createParentDto: CreateParentDto) {
        const { email, password } = createParentDto;

        const existingUser = await this.prisma.utilisateur.findUnique({
            where: { email },
            include: {
                parentProfil: true,
            }
        });

        if (existingUser) {
            this.logger.error(`Un utilisateur avec cet email existe déjà: ${email}`);
            throw new ConflictException('Un utilisateur avec cet email existe déjà.');
        }

        const newParent = await this.parentService.createProfil(createParentDto, password);

        const accessToken = await this.jwtService.signAsync({
            userId: newParent.id,
            email: newParent.email,
            role: newParent.role
        });

        return {
            message: 'Parent créé avec succès',
            data: {
                accessToken,
                user: {
                    ...newParent,
                }
            }
        };
    }

    async createAssistante(createAssistanteDto: CreateAssistanteDto) {
        const { email, password } = createAssistanteDto;

        const existingUser = await this.prisma.utilisateur.findUnique({
            where: { email },
        });

        if (existingUser) {
            this.logger.error(`[AuthService] Un utilisateur avec cet email existe déjà: ${email}`);
            throw new ConflictException('Un utilisateur avec cet email existe déjà.');
        }

        const newAssistante = await this.assistanteService.createProfil(createAssistanteDto, password);

        const accessToken = await this.jwtService.signAsync({
            userId: newAssistante.id,
            email: newAssistante.email,
            role: newAssistante.role
        });

        return {
            message: 'Assistante créée avec succès',
            data: {
                accessToken,
                user: {
                    ...newAssistante,
                }
            }
        };
    }
}