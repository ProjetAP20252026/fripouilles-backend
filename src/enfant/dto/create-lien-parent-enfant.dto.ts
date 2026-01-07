import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLienParentEnfantDto {
    @ApiProperty({ example: 1, description: 'L\'ID du parent' })
    @IsNotEmpty({ message: 'L\'ID du parent est obligatoire' })
    @IsInt({ message: 'L\'ID du parent doit être un entier' })
    readonly parentId: number;

    @ApiProperty({ example: 1, description: 'L\'ID de l\'enfant' })
    @IsNotEmpty({ message: 'L\'ID de l\'enfant est obligatoire' })
    @IsInt({ message: 'L\'ID de l\'enfant doit être un entier' })
    readonly enfantId: number;

    @ApiProperty({ example: true, description: 'Indique si le parent est responsable légal', required: false })
    @IsOptional()
    @IsBoolean({ message: 'Le statut de responsable légal doit être un booléen' })
    readonly estResponsableLegal?: boolean;
}
