import { Request } from 'express';
import { JwtPayload } from './strategies/jwt.strategy';

// Re-export JwtPayload for convenience
export type { JwtPayload };

/**
 * Express Request with authenticated user attached by Passport
 * Note: For use in decorated controller methods, define this interface
 * locally in the controller file due to TypeScript isolatedModules constraints.
 */
export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
