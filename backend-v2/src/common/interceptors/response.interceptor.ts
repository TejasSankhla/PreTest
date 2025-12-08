import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SKIP_RESPONSE_TRANSFORM_KEY } from '../decorators/skip-response-transform.decorator';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  msg: string;
  err: null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T> | T> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T> | T> {
    const skipTransform = this.reflector.getAllAndOverride<boolean>(
      SKIP_RESPONSE_TRANSFORM_KEY,
      [context.getHandler(), context.getClass()],
    );

    return next.handle().pipe(
      map((data) => {
        // Skip transformation if decorator is present
        if (skipTransform) {
          return data;
        }

        // If the response already has the expected format, return as is
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'msg' in data
        ) {
          return data;
        }

        // Wrap the response in standard format
        return {
          data: data,
          success: true,
          msg: 'Success',
          err: null,
        };
      }),
    );
  }
}
