import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateSuiviGardeAssistanteDto } from './dto/create-suivi-garde-assistante.dto';
import { UpdateSuiviGardeAssistanteDto } from './dto/update-suivi-garde-assistante.dto';
import { ValidateSuiviGardeAssistanteDto } from './dto/validate-suivi-garde-assistante.dto';
import { SuiviGardeAssistanteService } from './suivi-garde-assistante.service';

@Controller('suivi-garde-assistante')
export class SuiviGardeAssistanteController {
  constructor(private readonly suiviService: SuiviGardeAssistanteService) { }

  @Post()
  create(@Body() createDto: CreateSuiviGardeAssistanteDto) {
    return this.suiviService.create(createDto);
  }

  @Get()
  findAll() {
    return this.suiviService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suiviService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSuiviGardeAssistanteDto) {
    return this.suiviService.update(id, updateDto);
  }

  @Patch(':id/valider')
  validate(@Param('id', ParseIntPipe) id: number, @Body() validateDto: ValidateSuiviGardeAssistanteDto) {
    return this.suiviService.validate(id, validateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suiviService.remove(id);
  }
}
