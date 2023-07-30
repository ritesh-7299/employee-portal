import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //For enabling cors
  //app.enableCors();
  app.enableCors({
    origin: process.env.ALLOW_ORIGINS.split(';'),
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });

  //For enabling validation errors globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000).then(() => console.log('Server is started on 8000'));
}
bootstrap();
