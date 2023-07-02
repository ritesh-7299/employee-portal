import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //For enabling validation errors globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001).then(() => console.log('Server is started on 3001'));
}
bootstrap();
