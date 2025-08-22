import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/interfaces/authenticated-user.inteface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  async login(@Body() data: LoginDto) {
    const userToken = await this.authService.validateUser(data);
    if (!userToken) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userToken;
  }
  @Post('renew')
  @UseGuards(JwtAuthGuard)
  async renew(@Req() req: AuthenticatedRequest) {
    const user = await this.authService.validateRenew(req);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
