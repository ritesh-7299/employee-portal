import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //For enabling cors
  //app.enableCors();
  app.enableCors({
    origin: ["https://employee-portal-rd.vercel.app"]
  });

  //For enabling validation errors globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000).then(() => console.log('Server is started on 8000'));
}
bootstrap();
