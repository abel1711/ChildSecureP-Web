import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.inteface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async validateUser(userLogin: LoginDto) {
    const userDb = await this.prisma.user.findUnique({ where: { email: userLogin.email } })
    if (!userDb || !userDb.active) return null;

    if (userDb.passwordHash === userLogin.password) {
      const token = this.jwtService.sign({
        id: userDb.id,
        email: userDb.email,
        role: userDb.role
      });
      return {
        token,
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
        role: userDb.role,
        expiration: userDb.expiration

      }
    } else return null;
  }
  async validateRenew(req: AuthenticatedRequest) {
    const userDb = await this.prisma.user.findUnique({ where: { email: req.user.email } })
    if (!userDb || !userDb.active) return null;

    const token = this.jwtService.sign({
      id: userDb.id,
      email: userDb.email,
      role: userDb.role
    });
    return {
      token,
      id: userDb.id,
      name: userDb.name,
      email: userDb.email,
      role: userDb.role,
      expiration: userDb.expiration
    }
  }
}
