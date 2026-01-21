import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as crypto from 'crypto';

// Extend Request to include rawBody from body-parser
interface RequestWithRawBody extends Request {
  rawBody?: Buffer;
}

/**
 * Guard for validating ElevenLabs webhook signatures
 * Uses HMAC-SHA256 signature verification via ElevenLabs-Signature header
 */
@Injectable()
export class WebhookSignatureGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithRawBody>();
    const signature = request.headers['elevenlabs-signature'] as string;
    const webhookSecret = this.configService.get<string>(
      'elevenlabs.webhookSecret',
    );

    // If no webhook secret is configured, skip verification (development mode)
    if (!webhookSecret) {
      console.warn(
        'ELEVENLABS_WEBHOOK_SECRET not configured - skipping signature verification',
      );
      return true;
    }

    if (!signature) {
      throw new UnauthorizedException('Missing ElevenLabs-Signature header');
    }

    // Get raw body for signature verification
    // Note: Requires raw body parser middleware
    const rawBody = request.rawBody;
    if (!rawBody) {
      console.error(
        'Raw body not available for webhook signature verification',
      );
      throw new UnauthorizedException('Unable to verify webhook signature');
    }

    // Verify HMAC-SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    return true;
  }
}
