import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from 'generated/prisma/enums';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = {
    userId: number;
    email: string;
    role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload.userId || !payload.email || !payload.role) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return {
            sub: payload.userId,
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        };
    }
}
