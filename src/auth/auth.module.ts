import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AssistanteModule } from 'src/assistante/assistante.module';
import { ParentModule } from 'src/parent/parent.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ParentModule,
    AssistanteModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      }),
    }),
    PrismaModule,
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    Logger,
  ],
  controllers: [AuthController]
})
export class AuthModule { }
