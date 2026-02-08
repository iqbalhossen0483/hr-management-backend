import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTPayload } from 'src/type/common';

type AuthRequest = Request & { user: JWTPayload };

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();

    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return request.user;
  },
);
