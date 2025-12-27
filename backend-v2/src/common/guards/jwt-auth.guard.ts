import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JWT payload structure from token
interface JwtPayload {
  UserId: string;
  email: string;
  type: 'user' | 'mentor';
}

// Auth info from Passport
interface AuthInfo {
  message?: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayload>(
    err: Error | null,
    user: TUser | false,
    info?: AuthInfo,
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        data: null,
        success: false,
        msg: info?.message || 'Please try again',
        err: err || info,
      });
    }
    return user;
  }
}
