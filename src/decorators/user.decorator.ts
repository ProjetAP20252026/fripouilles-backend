import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../auth/jwt/jwt.strategy';

export const User = createParamDecorator(
    (data: keyof JwtPayload, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!data) return request.user;

        return request.user?.[data];
    },
);
