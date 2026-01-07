import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';

export const UserRole = createParamDecorator(
    (data: Role, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.role;
    }
);