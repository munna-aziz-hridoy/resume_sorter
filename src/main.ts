import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.enableCors({
    origin: '*',
  });
  await app.listen(5000);

  const prisma = new PrismaClient();
  await prisma
    .$connect()
    .catch((err) => console.error('Prisma connection error:', err));
}
bootstrap();
