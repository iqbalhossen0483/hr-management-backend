import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { JWTPayload } from 'src/type/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies['accessToken'] as string;

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized: Access token is missing');
    }

    const accessTokenSecret = this.config.get<string>('jwt.secret') as string;
    try {
      const decoded = this.jwtService.verify<JWTPayload>(accessToken, {
        secret: accessTokenSecret,
      });
      request['user'] = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized: Invalid access token');
    }
  }
}
