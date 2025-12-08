import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // CORS Configuration
  app.enableCors({
    origin: [
      configService.get<string>('app.clientFrontendUrl'),
      configService.get<string>('app.mentorFrontendUrl'),
      'http://localhost:3000',
      'http://localhost:3001',
    ].filter(Boolean),
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  // Global prefix to match existing API routes
  app.setGlobalPrefix('api');

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global response interceptor (with Reflector for decorator support)
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  // Validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port);

  console.log(`Server started on port ${port}`);
}

bootstrap();
