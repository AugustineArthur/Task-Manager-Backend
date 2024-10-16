import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty({ message: 'Fullname is required' })
  fullname!: string;  

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
