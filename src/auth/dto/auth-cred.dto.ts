import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: 'password is weak',
  })
  password: string;
}
