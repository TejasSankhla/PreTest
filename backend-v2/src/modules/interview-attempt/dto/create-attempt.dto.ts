import { IsOptional, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { Platform } from '../../../schemas/interview-attempt.schema';

export class CreateAttemptDto {
  /**
   * ElevenLabs conversation ID received from WebSocket connection
   * Frontend gets this when connecting to the signed URL
   */
  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;
}
