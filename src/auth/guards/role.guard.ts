import { CanActivate, ExecutionContext, ForbiddenException, Injectable, mixin } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';

export const RoleGuard = (...allowedRoles: Role[]) => {
    @Injectable()
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            if (!user || !allowedRoles.includes(user.role)) {
                throw new ForbiddenException('Accès interdit pour ce rôle');
            }
            return true;
        }
    }
    return mixin(RoleGuardMixin);
};
