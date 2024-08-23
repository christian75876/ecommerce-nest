import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './filters/error-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    disableErrorMessages: false,
    stopAtFirstError: false, // Cambiado a false para capturar todos los errores
    exceptionFactory: (errors) => {
      const errorMessages = errors.reduce((acc, error) => {
        if (error.constraints) {
          acc.push(`${error.property} - ${Object.values(error.constraints).join(', ')}`);
        }
        return acc;
      }, []);
      return new BadRequestException({
        statusCode: 400,
        message: errorMessages,
      });
    },
  }));

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(3001);
}
bootstrap();
