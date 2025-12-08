import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
}));
