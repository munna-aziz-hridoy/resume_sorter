import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Log all queries, info, warnings, and errors
  });
  await prisma
    .$connect()
    .catch((err) => console.error('Prisma connection error:', err));

  await app.listen(PORT);
}
bootstrap();
