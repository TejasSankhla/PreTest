import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ElevenLabsTranscriptItemDto {
  @IsString()
  role: 'agent' | 'user';

  @IsString()
  message: string;

  @IsNumber()
  time_in_call_secs: number;

  @IsOptional()
  @IsArray()
  tool_calls?: unknown[];

  @IsOptional()
  @IsArray()
  tool_results?: unknown[];
}

class ElevenLabsMetadataDto {
  @IsOptional()
  @IsNumber()
  start_time_unix_secs?: number;

  @IsOptional()
  @IsNumber()
  end_time_unix_secs?: number;

  @IsOptional()
  @IsNumber()
  call_duration_secs?: number;
}

class ElevenLabsWebhookDataDto {
  @IsString()
  agent_id: string;

  @IsString()
  conversation_id: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ElevenLabsTranscriptItemDto)
  transcript?: ElevenLabsTranscriptItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ElevenLabsMetadataDto)
  metadata?: ElevenLabsMetadataDto;

  @IsOptional()
  analysis?: unknown;
}

export class ElevenLabsWebhookDto {
  @IsString()
  type: string;

  @IsNumber()
  event_timestamp: number;

  @ValidateNested()
  @Type(() => ElevenLabsWebhookDataDto)
  data: ElevenLabsWebhookDataDto;
}
