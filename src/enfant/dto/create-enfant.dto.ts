import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sexe } from 'generated/prisma/enums';

export class CreateEnfantDto {
    @ApiProperty({ example: 'Dupont', description: 'Le nom de l\'enfant' })
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    @IsString({ message: 'Le nom doit être une chaîne de caractères' })
    readonly nom: string;

    @ApiProperty({ example: 'Emma', description: 'Le prénom de l\'enfant' })
    @IsNotEmpty({ message: 'Le prénom est obligatoire' })
    @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
    readonly prenom: string;

    @ApiProperty({ example: '2020-05-15', description: 'La date de naissance de l\'enfant (format ISO)' })
    @IsNotEmpty({ message: 'La date de naissance est obligatoire' })
    @IsDateString({}, { message: 'La date de naissance doit être une date valide (format ISO)' })
    readonly dateNaissance: string;

    @ApiProperty({ example: 'FILLE', description: 'Le sexe de l\'enfant (GARCON ou FILLE)' })
    @IsNotEmpty({ message: 'Le sexe est obligatoire' })
    @IsEnum(Sexe, { message: 'Le sexe doit être GARCON ou FILLE' })
    readonly sexe: Sexe;

    @ApiProperty({ example: 'Arachides, Noix', description: 'Les allergies de l\'enfant', required: false })
    @IsOptional()
    @IsString({ message: 'Les allergies doivent être une chaîne de caractères' })
    readonly allergies?: string;

    @ApiProperty({ example: 'Asthme léger', description: 'Les remarques médicales concernant l\'enfant', required: false })
    @IsOptional()
    @IsString({ message: 'Les remarques médicales doivent être une chaîne de caractères' })
    readonly remarquesMedicales?: string;

    @ApiProperty({ example: 'Dr. Martin', description: 'Le nom du médecin traitant', required: false })
    @IsOptional()
    @IsString({ message: 'Le nom du médecin doit être une chaîne de caractères' })
    readonly medecinTraitant?: string;

    @ApiProperty({ example: '0612345678', description: 'Le numéro de téléphone du médecin traitant', required: false })
    @IsOptional()
    @IsString({ message: 'Le numéro de téléphone du médecin doit être une chaîne de caractères' })
    readonly medecinTraitantTel?: string;
}
