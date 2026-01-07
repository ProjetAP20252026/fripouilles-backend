import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePersonneAutoriseeDto {
    @ApiProperty({ example: 1, description: 'L\'ID de l\'enfant' })
    @IsNotEmpty({ message: 'L\'ID de l\'enfant est obligatoire' })
    @IsNumber({}, { message: 'L\'ID de l\'enfant doit être un nombre' })
    readonly enfantId: number;

    @ApiProperty({ example: 'Dupont', description: 'Le nom de la personne autorisée' })
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    @IsString({ message: 'Le nom doit être une chaîne de caractères' })
    readonly nom: string;

    @ApiProperty({ example: 'Marie', description: 'Le prénom de la personne autorisée' })
    @IsNotEmpty({ message: 'Le prénom est obligatoire' })
    @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
    readonly prenom: string;

    @ApiProperty({ example: '0612345678', description: 'Le numéro de téléphone de la personne autorisée' })
    @IsNotEmpty({ message: 'Le numéro de téléphone est obligatoire' })
    @IsString({ message: 'Le numéro de téléphone doit être une chaîne de caractères' })
    readonly telephone: string;

    @ApiProperty({ example: 'Grand-mère', description: 'Le lien avec l\'enfant' })
    @IsNotEmpty({ message: 'Le lien avec l\'enfant est obligatoire' })
    @IsString({ message: 'Le lien avec l\'enfant doit être une chaîne de caractères' })
    readonly lienAvecEnfant: string;

    @ApiProperty({ example: true, description: 'Indique si l\'autorisation écrite est fournie', required: false })
    @IsOptional()
    @IsBoolean({ message: 'L\'autorisation écrite doit être un booléen' })
    readonly autorisationEcrite?: boolean;
}
