import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck() {
    return {
      data: { status: 'ok' },
      success: true,
      msg: 'response from backend service',
      err: null,
    };
  }

  // Keeping /dummy for backward compatibility
  @Get('dummy')
  dummy() {
    return {
      message: 'response from backend service',
    };
  }
}
