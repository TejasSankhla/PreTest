import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginMentorDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
