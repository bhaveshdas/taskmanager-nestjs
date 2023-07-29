import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredDto } from './dto/auth-cred.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    private UserEntityRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signup(authCredDto: AuthCredDto): Promise<void> {
    return this.UserEntityRepository.createUser(authCredDto);
  }

  async signin(authCredDto: AuthCredDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredDto;
    const user = await this.UserEntityRepository.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Username or password is not correct');
    }
  }
}
