import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/setup.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  const logger = new Logger('NestApplication', {
    timestamp: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  })

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'api/doc', method: RequestMethod.GET },
      { path: 'api/doc/*path', method: RequestMethod.GET },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await setupSwagger(app, 'api/doc');

  await app.listen(port, '0.0.0.0');
  logger.log(`Nest application is running on: http://localhost:${port}`);
  logger.log(`Swagger documentation is available on: http://localhost:${port}/api/doc`);
}
bootstrap();
