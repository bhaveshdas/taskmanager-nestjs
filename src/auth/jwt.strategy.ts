import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { jwtPayload } from './jwt-payload-interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'topsecret1',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: jwtPayload): Promise<User> {
    const { username } = payload;
    const user = this.userRepository.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
