import { registerAs } from '@nestjs/config';

export default registerAs('elevenlabs', () => ({
  apiKey: process.env.ELEVENLABS_API_KEY,
  webhookSecret: process.env.ELEVENLABS_WEBHOOK_SECRET,
  baseUrl: 'https://api.elevenlabs.io/v1',
}));
