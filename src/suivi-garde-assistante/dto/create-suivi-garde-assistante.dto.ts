import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { StatutValidation } from 'generated/prisma/enums';

export class CreateSuiviGardeAssistanteDto {
    @ApiProperty({ example: 3, description: "Identifiant de l'assistante" })
    @IsInt({ message: "L'id de l'assistante doit être un entier" })
    @IsPositive({ message: "L'id de l'assistante doit être positif" })
    assistanteId: number;

    @ApiProperty({ example: '2026-04-15', description: 'Date de la garde' })
    @IsDateString({}, { message: 'La date doit être au format ISO' })
    date: string;

    @ApiProperty({ example: '2026-04-15T08:00:00.000Z', required: false, description: "Heure d'arrivée réelle" })
    @IsOptional()
    @IsDateString({}, { message: "L'heure d'arrivée doit être une date ISO" })
    heureArriveeReelle?: string;

    @ApiProperty({ example: '2026-04-15T17:00:00.000Z', required: false, description: "Heure de départ réelle" })
    @IsOptional()
    @IsDateString({}, { message: "L'heure de départ doit être une date ISO" })
    heureDepartReelle?: string;

    @ApiProperty({ example: 2, description: 'Nombre de repas fournis' })
    @IsInt({ message: 'Le nombre de repas doit être un entier' })
    @Min(0, { message: 'Le nombre de repas doit être positif' })
    repasFournis: number;

    @ApiProperty({ example: 5.5, required: false, description: 'Frais divers (en euros)' })
    @IsOptional()
    @IsNumber({}, { message: 'Les frais divers doivent être un nombre' })
    @Min(0, { message: 'Les frais divers doivent être positifs' })
    fraisDivers?: number;

    @ApiProperty({ example: 12.3, required: false, description: 'Kilomètres parcourus pour cette garde' })
    @IsOptional()
    @IsNumber({}, { message: 'Les kilomètres doivent être un nombre' })
    @Min(0, { message: 'Les kilomètres doivent être positifs' })
    kilometresParcourus?: number;

    @ApiProperty({ example: 1, description: 'Nombre d’enfants gardés sur ce créneau' })
    @IsInt({ message: "Le nombre d'enfants doit être un entier" })
    @IsPositive({ message: "Le nombre d'enfants doit être positif" })
    nombreEnfantsGarde: number;

    @ApiProperty({ enum: StatutValidation, required: false, description: 'Statut de validation (par défaut EN_ATTENTE)' })
    @IsOptional()
    @IsEnum(StatutValidation, { message: 'Le statut doit être EN_ATTENTE, VALIDE ou REFUSE' })
    statutValidation?: StatutValidation;
}
