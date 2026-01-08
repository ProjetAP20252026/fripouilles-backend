import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreatePaieDto } from './dto/create-paie.dto';
import { UpdatePaieDto } from './dto/update-paie.dto';
import { PaieService } from './paie.service';

@Controller('paie')
export class PaieController {
  constructor(private readonly paieService: PaieService) { }

  @Post()
  create(@Body() createPaieDto: CreatePaieDto) {
    return this.paieService.create(createPaieDto);
  }

  @Get()
  findAll() {
    return this.paieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePaieDto: UpdatePaieDto) {
    return this.paieService.update(id, updatePaieDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paieService.remove(id);
  }
}
