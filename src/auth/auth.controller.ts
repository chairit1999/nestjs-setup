import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserSigninDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Request as RequestExpress } from 'express';
import { JwtPayload } from 'src/share/interface/jwt.interface';
import { UserEntity } from 'src/database/entities/user.entity';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestExpress, @Body() _: UserSigninDto) {
    const user = req.user as UserEntity;
    const payload: JwtPayload = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    };
    const accessToken = this.authService.getnerateAccessToken(payload);
    return { accessToken, userInfo: { payload } };
  }
}
