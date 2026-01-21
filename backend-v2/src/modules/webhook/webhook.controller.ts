import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { WebhookSignatureGuard } from '../../common/guards/webhook-signature.guard';
import { ElevenLabsWebhookService } from './elevenlabs-webhook.service';
import { ElevenLabsWebhookDto } from './dto/elevenlabs-webhook.dto';

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly elevenLabsWebhookService: ElevenLabsWebhookService,
  ) {}

  /**
   * POST /api/webhooks/elevenlabs
   *
   * Handle ElevenLabs webhook events:
   * - post_call_transcription: Call ended, transcript available
   * - post_call_audio: Audio recording available
   *
   * Authentication: HMAC-SHA256 signature via ElevenLabs-Signature header
   */
  @Post('elevenlabs')
  @UseGuards(WebhookSignatureGuard)
  @HttpCode(HttpStatus.OK)
  async handleElevenLabsWebhook(
    @Body() payload: ElevenLabsWebhookDto,
  ): Promise<{ received: boolean }> {
    this.logger.log(`Received ElevenLabs webhook: ${payload.type}`);

    try {
      await this.elevenLabsWebhookService.handleWebhook(payload);
      return { received: true };
    } catch (error) {
      this.logger.error('Failed to process webhook:', error);
      // Still return 200 to prevent ElevenLabs from retrying
      // We log the error and can investigate manually
      return { received: true };
    }
  }
}
