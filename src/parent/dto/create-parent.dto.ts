import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateParentDto extends CreateUserDto {
    @ApiProperty({ example: '123 Avenue des Champs', description: "L'adresse du parent" })
    @IsNotEmpty({ message: "L'adresse est obligatoire" })
    @IsString({ message: "L'adresse doit être une chaîne de caractères" })
    readonly adresse: string;

    @ApiProperty({ example: "75000", description: "Le code postal du parent" })
    @IsNotEmpty({ message: "Le code postal est obligatoire" })
    @IsString({ message: "Le code postal doit être une chaîne de caractères" })
    readonly codePostal: string;

    @ApiProperty({ example: 'Paris', description: "La ville du parent" })
    @IsNotEmpty({ message: 'La ville est obligatoire' })
    @IsString({ message: 'La ville doit être une chaîne de caractères' })
    readonly ville: string;

    @ApiProperty({ example: 'Célibataire', description: "La situation familiale du parent" })
    @IsNotEmpty({ message: 'La situation familiale est obligatoire' })
    @IsString({ message: 'La situation familiale doit être une chaîne de caractères' })
    readonly situationFamiliale: string;

    @ApiProperty({ example: 'Ingénieur', description: "La profession du parent", required: false })
    @IsOptional()
    @IsString({ message: 'La profession doit être une chaîne de caractères' })
    readonly profession?: string;

    @ApiProperty({ example: 'Entreprise XYZ', description: "L'employeur du parent", required: false })
    @IsOptional()
    @IsString({ message: "L'employeur doit être une chaîne de caractères" })
    readonly employeur?: string;

    @ApiProperty({ example: '1234567890123', description: "Le numéro d'allocataire du parent", required: false })
    @IsOptional()
    @IsString({ message: "Le numéro d'allocataire doit être une chaîne de caractères" })
    readonly numeroAllocataire?: string;

    @ApiProperty({ example: true, description: "Indique si le parent est bénéficiaire de la CAF", required: false })
    @IsOptional()
    @IsBoolean({ message: 'Le statut de bénéficiaire CAF doit être un booléen' })
    readonly beneficiaireCAF?: boolean;

    @ApiProperty({ example: '9876543210987', description: "Le numéro CAF du parent", required: false })
    @IsOptional()
    @IsString({ message: "Le numéro CAF doit être une chaîne de caractères" })
    readonly numeroCAF?: string;

    @ApiProperty({ example: 'Jean Dupont', description: "Le contact d'urgence du parent" })
    @IsNotEmpty({ message: "Le contact d'urgence est obligatoire" })
    @IsString({ message: "Le contact d'urgence doit être une chaîne de caractères" })
    readonly contactUrgenceNom: string; // Changé de contactUrgence à contactUrgenceNom

    @ApiProperty({ example: '0612345678', description: "Le numéro de contact d'urgence du parent" })
    @IsNotEmpty({ message: "Le numéro de contact d'urgence est obligatoire" })
    @IsString({ message: "Le numéro de contact d'urgence doit être une chaîne de caractères" })
    readonly contactUrgenceTel: string;
}