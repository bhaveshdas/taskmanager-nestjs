import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredDto } from './dto/auth-cred.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() authcreateDto: AuthCredDto): Promise<void> {
    return this.authService.signup(authcreateDto);
  }
  @Post('/signin')
  signin(@Body() authcreateDto: AuthCredDto): Promise<{ accessToken: string }> {
    return this.authService.signin(authcreateDto);
  }
}
