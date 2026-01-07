import { PartialType } from '@nestjs/mapped-types';
import { CreateAssistanteDto } from './create-assistante.dto';

export class UpdateAssistanteDto extends PartialType(CreateAssistanteDto) { }