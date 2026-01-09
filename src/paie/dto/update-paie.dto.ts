import { PartialType } from '@nestjs/mapped-types';
import { CreatePaieDto } from './create-paie.dto';

export class UpdatePaieDto extends PartialType(CreatePaieDto) { }
