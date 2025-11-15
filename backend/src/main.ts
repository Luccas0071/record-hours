import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Remove propriedades que não estão no DTO
      whitelist: true,
      // Lança erro se houver propriedades não permitidas
      forbidNonWhitelisted: false,
      // transforma os tipos automaticamente
      transform: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // se você usa cookies/autenticação
  });

  app.enableVersioning({
    // /v1/rota
    type: VersioningType.URI,
    // define a versão padrão
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
