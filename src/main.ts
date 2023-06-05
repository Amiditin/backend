import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Тест связи чисел')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3001);
}
bootstrap();

// curl -X POST -H "Content-Type: application/json" -d '{  "name": "Центр спортивной медицины ФМБА России",  "abbreviation": "ФГБУ ФНКЦСМ ФМБА России",  "email": "test@mail.ru",  "phone": "89120120012",  "contact": "Владимир",  "address": "Нижний Новгород",  "website": "www.sportfmba.ru"}' localhost:3001/organizations
// curl -X POST -H "Content-Type: application/json" -d '{  "fullname": "Пользователь",  "email": "address@mail.ru",  "password": "12345",  "phone": "89212597422",  "isVerified": true,  "organization": "92afcf68-2a8c-4d0a-ae9d-7c3293f076c3"}' localhost:3001/auth/register

/* {  "fullname": "Пользователь",  "email": "address@mail.ru",  "password": "12345",  "phone": "89212597422",  "isVerified": true,  "organization": "92afcf68-2a8c-4d0a-ae9d-7c3293f076c3"} */
