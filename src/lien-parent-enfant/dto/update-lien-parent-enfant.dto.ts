import { PartialType } from '@nestjs/swagger';
import { CreateLienParentEnfantDto } from './create-lien-parent-enfant.dto';

export class UpdateLienParentEnfantDto extends PartialType(CreateLienParentEnfantDto) { }