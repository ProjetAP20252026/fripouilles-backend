import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatutValidation } from 'generated/prisma/enums';

export class ValidateSuiviGardeAssistanteDto {
    @ApiProperty({ enum: StatutValidation, description: 'Nouveau statut de validation (VALIDE ou REFUSE)' })
    @IsEnum(StatutValidation, { message: 'Le statut doit être EN_ATTENTE, VALIDE ou REFUSE' })
    statutValidation: StatutValidation;

    @ApiProperty({ example: 'Validé après contrôle des heures', required: false })
    @IsOptional()
    @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
    commentaireParent?: string;
}
