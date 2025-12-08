import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  clientFrontendUrl: process.env.Client_Frontend_URL,
  mentorFrontendUrl: process.env.Mentor_Frontend_URL,
}));
