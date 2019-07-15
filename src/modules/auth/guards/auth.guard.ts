import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../jwt.constants';
import { UserJwtPayload } from '../models/dtos/user-jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userJwt: UserJwtPayload = await this.getUserFromJWTToken(this.extractToken(request));
    return true;
  }

  private extractToken(request): string {
    if (
      request &&
      request.headers &&
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer ')
    ) {
      return request.headers.authorization.substring(
        7,
        request.headers.authorization.length,
      );
    } else {
      return '';
    }
  };

  private async getUserFromJWTToken(jwtToken: string): Promise<UserJwtPayload> {
    if (!jwtToken) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = await jwt.verify(
        jwtToken,
        jwtConstants.secret
      );

      return decoded as UserJwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}