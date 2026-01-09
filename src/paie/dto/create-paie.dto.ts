import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreatePaieDto {
    @ApiProperty({ example: 1, description: 'Identifiant du contrat de garde concerné' })
    @IsInt({ message: 'Le contratId doit être un entier' })
    @IsPositive({ message: 'Le contratId doit être positif' })
    contratGardeId: number;

    @ApiProperty({ example: 4, description: 'Mois concerné (1-12)' })
    @IsInt({ message: 'Le mois doit être un entier' })
    @Min(1, { message: 'Le mois doit être compris entre 1 et 12' })
    @Max(12, { message: 'Le mois doit être compris entre 1 et 12' })
    mois: number;

    @ApiProperty({ example: 2026, description: 'Année concernée' })
    @IsInt({ message: "L'année doit être un entier" })
    @Min(2000, { message: "L'année doit être supérieure à 2000" })
    annee: number;

    @ApiProperty({ example: 'Bulletin généré automatiquement', required: false })
    @IsOptional()
    @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
    commentaire?: string;
}
