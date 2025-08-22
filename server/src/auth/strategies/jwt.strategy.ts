import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!
    })
  }

  async validate(payload: any) {
    const userAuth = await this.prisma.user.findUnique({ where: { id: payload.id } })
    console.log('<userAuth>: ====>', userAuth);
    if (!userAuth) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return {
      id: userAuth.id,
      name: userAuth.name,
      email: userAuth.email,
      role: userAuth.role,
      expiration: userAuth.expiration
    }
  }
}