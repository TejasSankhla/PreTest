import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Fields to redact from logs for security
const SENSITIVE_FIELDS = [
  'password',
  'token',
  'authorization',
  'secret',
  'apiKey',
  'api_key',
];

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    // Log request
    this.logRequest(method, originalUrl, req.body, req.query);

    // Capture response body
    const originalSend = res.send.bind(res);
    let responseBody: unknown;

    res.send = (body: unknown): Response => {
      responseBody = body;
      return originalSend(body);
    };

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const contentLength = res.get('content-length') || 0;

      // Color code based on status
      const logMethod =
        statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'log';

      this.logger[logMethod](
        `${method} ${originalUrl} ${statusCode} ${duration}ms - ${contentLength} bytes`,
      );

      // Log response body
      this.logResponse(statusCode, responseBody);

      // Log additional details for errors
      if (statusCode >= 400) {
        this.logger.log(`   IP: ${ip} | User-Agent: ${userAgent}`);
      }
    });

    next();
  }

  private logRequest(
    method: string,
    url: string,
    body: unknown,
    query: unknown,
  ): void {
    const sanitizedBody = this.sanitize(body);
    const sanitizedQuery = this.sanitize(query);

    // Skip logging body for GET requests or if body is empty
    if (method === 'GET' || !body || Object.keys(body as object).length === 0) {
      if (query && Object.keys(query as object).length > 0) {
        this.logger.log(
          `→ REQ ${method} ${url} | Query: ${JSON.stringify(sanitizedQuery)}`,
        );
      }
      // Don't log empty GET requests (they'll be logged in the response)
    } else {
      this.logger.log(
        `→ REQ ${method} ${url} | Body: ${JSON.stringify(sanitizedBody)}`,
      );
    }
  }

  private logResponse(statusCode: number, body: unknown): void {
    if (!body) return;

    try {
      // Parse if string
      const parsed: unknown =
        typeof body === 'string' ? (JSON.parse(body) as unknown) : body;
      const sanitized = this.sanitize(parsed);

      // Truncate large responses
      const bodyStr = JSON.stringify(sanitized);
      const truncated =
        bodyStr.length > 1000
          ? bodyStr.substring(0, 1000) + '...[truncated]'
          : bodyStr;

      this.logger.log(`← RES ${statusCode} | ${truncated}`);
    } catch {
      // If not JSON, log as-is (truncated)
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      if (bodyStr.length > 200) {
        this.logger.log(
          `← RES ${statusCode} | [non-JSON, ${bodyStr.length} chars]`,
        );
      }
    }
  }

  private sanitize(obj: unknown): unknown {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitize(item));
    }

    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (SENSITIVE_FIELDS.some((field) => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitize(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}
