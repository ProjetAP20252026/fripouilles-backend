import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser>(err: Error, user: TUser): TUser {
        if (err || !user) {
            throw new UnauthorizedException("Veuillez vous authentifier pour accéder à cette ressource.");
        }
        return user;
    }
}