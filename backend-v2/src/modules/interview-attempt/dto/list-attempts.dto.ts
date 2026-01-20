import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttemptStatus } from '../../../schemas/interview-attempt.schema';

export class ListAttemptsDto {
  @IsOptional()
  @IsString()
  interviewId?: string; // Filter by specific interview

  @IsOptional()
  @IsEnum(AttemptStatus)
  status?: AttemptStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
