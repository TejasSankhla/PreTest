import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsNumber, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  PORT?: number;

  @IsString()
  @IsNotEmpty({ message: 'Client_Frontend_URL is required' })
  Client_Frontend_URL: string;

  @IsString()
  @IsNotEmpty({ message: 'Mentor_Frontend_URL is required' })
  Mentor_Frontend_URL: string;

  @IsString()
  @IsNotEmpty({ message: 'Mongo_URL is required' })
  Mongo_URL: string;

  @IsString()
  @IsNotEmpty({ message: 'JWT_SECRET is required' })
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRY?: string;

  @IsString()
  @IsNotEmpty({ message: 'RAZORPAY_KEY_ID is required' })
  RAZORPAY_KEY_ID: string;

  @IsString()
  @IsNotEmpty({ message: 'RAZORPAY_KEY_SECRET is required' })
  RAZORPAY_KEY_SECRET: string;

  @IsString()
  @IsNotEmpty({ message: 'CLIENT_ID (Google) is required' })
  CLIENT_ID: string;

  @IsString()
  @IsNotEmpty({ message: 'CLIENT_SECRET (Google) is required' })
  CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty({ message: 'REFRESH_TOKEN (Google) is required' })
  REFRESH_TOKEN: string;

  @IsString()
  @IsNotEmpty({ message: 'Resend_API_KEY is required' })
  Resend_API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}).join(', '))
      .join('\n');
    throw new Error(`Environment validation failed:\n${errorMessages}`);
  }

  return validatedConfig;
}
