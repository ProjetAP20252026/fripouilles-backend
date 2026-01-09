import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistanteModule } from './assistante/assistante.module';
import { AuthModule } from './auth/auth.module';
import { EnfantModule } from './enfant/enfant.module';
import { ParentModule } from './parent/parent.module';
import { PersonneAutoriseeModule } from './personne-autorisee/personne-autorisee.module';
import { PrismaModule } from './prisma/prisma.module';
import { LienParentEnfantModule } from './lien-parent-enfant/lien-parent-enfant.module';
import { PaieModule } from './paie/paie.module';
import { SuiviGardeAssistanteModule } from './suivi-garde-assistante/suivi-garde-assistante.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    ParentModule,
    AssistanteModule,
    EnfantModule,
    PersonneAutoriseeModule,
    LienParentEnfantModule,
    PaieModule,
    SuiviGardeAssistanteModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaModule, Logger],
})
export class AppModule { }