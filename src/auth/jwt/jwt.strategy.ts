import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from 'generated/prisma/enums';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = {
    sub: number;
    email: string;
    role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') as string,
        });
    }

    async validate(payload: JwtPayload) {
        return {
            sub: payload.sub,
            userId: payload.sub,
            email: payload.email,
            role: payload.role
        };
    }
}
