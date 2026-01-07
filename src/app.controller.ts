import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Retourner un message de bienvenue' })
  @ApiOkResponse({
    description: 'Retourne un message de bienvenue et un lien vers la documentation de l\'API.', schema: {
      example: { message: 'Bienvenue sur l\'API !', documentation: '/api/docs' }
    }
  })
  getHello(): { message: string, documentation: string } {
    return this.appService.getHello();
  }
}
