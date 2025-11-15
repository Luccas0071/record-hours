import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new Error('Senha incorreta');

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.setCurrentRefreshToken(user.id, hashedRefreshToken);

    return { ...payload, accessToken, refreshToken };
  }

  async refresh(id: number, refreshToken: string) {
    const user: any = await this.userService.findOne(id);

    if (!user || !user.currentHashedRefreshToken)
      throw new Error('Token inválido');

    const tokenMatches = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (!tokenMatches) throw new Error('Token inválido');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { accessToken };
  }
}
