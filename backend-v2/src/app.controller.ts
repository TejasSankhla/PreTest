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
      msg: 'Server is healthy',
      err: null,
    };
  }
}
