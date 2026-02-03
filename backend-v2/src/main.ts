import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Enable rawBody for webhook signature verification
    // This makes request.rawBody available for HMAC signature computation
    rawBody: true,
    // Enable all log levels
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // CORS Configuration
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, origin?: string | boolean) => void,
    ) => {
      // Reflect the requesting origin to support credentials
      callback(null, origin || '*');
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
    ],
  });

  // Global prefix to match existing API routes (exclude Bull Board admin UI)
  app.setGlobalPrefix('api', {
    exclude: ['/admin/queues*path'],
  });

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
  const port =
    process.env.PORT || configService.get<number>('app.port') || 4000;

  // Bind to 0.0.0.0 for Render (required for external access)
  await app.listen(port, '0.0.0.0');

  logger.log(`Server started on port ${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

void bootstrap();
