import { PartialType } from '@nestjs/mapped-types';
import { CreateSuiviGardeAssistanteDto } from './create-suivi-garde-assistante.dto';

export class UpdateSuiviGardeAssistanteDto extends PartialType(CreateSuiviGardeAssistanteDto) { }
