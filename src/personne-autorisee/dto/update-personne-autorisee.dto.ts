import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonneAutoriseeDto } from './create-personne-autorisee.dto';

export class UpdatePersonneAutoriseeDto extends PartialType(CreatePersonneAutoriseeDto) { }
