import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateLienParentEnfantDto {
    @ApiProperty({ example: true, description: 'Indique si le parent est responsable légal', required: false })
    @IsOptional()
    @IsBoolean({ message: 'Le statut de responsable légal doit être un booléen' })
    readonly estResponsableLegal?: boolean;
}
