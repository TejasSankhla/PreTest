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
      'http://localhost:4000',
      'http://localhost:4002',
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

  // Use process.env.PORT directly for Render deployment compatibility
  const port = process.env.PORT || configService.get<number>('app.port') || 4000;

  // Bind to 0.0.0.0 for Render (required for external access)
  await app.listen(port, '0.0.0.0');

  console.log(`Server started on port ${port}`);
}

bootstrap();
