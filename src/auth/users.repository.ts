import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredDto } from './dto/auth-cred.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserEntityRepository: Repository<User>,
  ) {}
  async createUser(authCredDto: AuthCredDto): Promise<void> {
    const { username, password } = authCredDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = this.UserEntityRepository.create({
      username: username,
      password: hash,
    });
    try {
      await this.UserEntityRepository.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username Already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async findOne(username: string): Promise<User> {
    const user = await this.UserEntityRepository.findOneBy({ username });
    return user;
  }
}
