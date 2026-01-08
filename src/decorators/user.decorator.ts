import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../auth/jwt/jwt.strategy';

export const User = createParamDecorator(
    (data: keyof JwtPayload | 'userId' | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!data) return request.user;
        if (data === 'sub' || data === 'userId') {
            return request.user.userId;
        }
        return request.user[data];
    },
);
