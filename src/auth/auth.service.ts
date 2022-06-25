import { Injectable } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtPayload } from 'src/share/interface/jwt.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { resolve } from 'path';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({
      where: { userName: username.toLocaleLowerCase() },
    });
    if (user && (await compareSync(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  getnerateAccessToken(payload: JwtPayload) {
    const accessTokenExpire = this.configService.get<number>(
      'jwt.accessTokenExpire',
      600,
    );
    const issuer = this.configService.get<string>('jwt.issuer', 'myproject');
    return {
      accessToken: this.jwtService.sign(payload, {
        privateKey: readFileSync(resolve('accesstoken.private'), 'utf8'),
        expiresIn: accessTokenExpire,
        issuer: issuer,
        algorithm: 'RS256',
      }),
      expire: accessTokenExpire,
    };
  }
}
