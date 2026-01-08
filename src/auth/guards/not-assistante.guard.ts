import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';

@Injectable()
export class NotAssistanteGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('Utilisateur non authentifié');
        }

        if (user.role === Role.ASSISTANTE_MATERNELLE) {
            throw new ForbiddenException('Les assistantes maternelles ne peuvent pas effectuer cette action');
        }

        return true;
    }
}
