import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateAssistanteDto extends CreateUserDto {
    @ApiProperty({ example: 'AG123456', description: "Le numéro d'agrément de l'assistante maternelle" })
    @IsNotEmpty({ message: "Le numéro d'agrément est obligatoire" })
    @IsString({ message: "Le numéro d'agrément doit être une chaîne de caractères" })
    readonly numeroAgrement: string;

    @ApiProperty({ example: '2020-01-01', description: "La date d'obtention de l'agrément" })
    @IsNotEmpty({ message: "La date d'obtention de l'agrément est obligatoire" })
    @IsDateString({}, { message: "La date d'obtention de l'agrément doit être une date valide (format ISO)" })
    readonly dateObtentionAgrement: string;

    @ApiProperty({ example: true, description: "Indique si l'agrément est valide" })
    @IsNotEmpty({ message: "Le statut de validité de l'agrément est obligatoire" })
    @IsBoolean({ message: "L'agrément valide doit être un booléen" })
    readonly agrementValide: boolean;

    @ApiProperty({ example: '2025-01-01', description: "La date de fin de l'agrément", required: false })
    @IsOptional()
    @IsDateString({}, { message: "La date de fin d'agrément doit être une date valide (format ISO)" })
    readonly dateFinAgrement?: string;

    @ApiProperty({ example: 4, description: "La capacité d'accueil de l'assistante maternelle" })
    @IsNotEmpty({ message: "La capacité d'accueil est obligatoire" })
    @IsNumber({}, { message: "La capacité d'accueil doit être un nombre" })
    readonly capaciteAccueil: number;

    @ApiProperty({ example: '123 Rue de la Paix', description: "L'adresse de l'assistante maternelle" })
    @IsNotEmpty({ message: "L'adresse est obligatoire" })
    @IsString({ message: "L'adresse doit être une chaîne de caractères" })
    readonly adresse: string;

    @ApiProperty({ example: "75000", description: "Le code postal de l'assistante maternelle" })
    @IsNotEmpty({ message: "Le code postal est obligatoire" })
    @IsString({ message: "Le code postal doit être une chaîne de caractères" })
    readonly codePostal: string;

    @ApiProperty({ example: 'Paris', description: "La ville de l'assistante maternelle" })
    @IsNotEmpty({ message: "La ville est obligatoire" })
    @IsString({ message: "La ville doit être une chaîne de caractères" })
    readonly ville: string;

    @ApiProperty({ example: 5, description: "L'expérience en années de l'assistante maternelle" })
    @IsNotEmpty({ message: "L'expérience est obligatoire" })
    @IsNumber({}, { message: "L'expérience doit être un nombre" })
    readonly experience: number;

    @ApiProperty({ example: 'Lundi au Vendredi de 8h à 18h', description: "Les disponibilités de l'assistante maternelle" })
    @IsNotEmpty({ message: "Les disponibilités sont obligatoires" })
    @IsString({ message: "Les disponibilités doivent être une chaîne de caractères" })
    readonly disponibilites: string;
}