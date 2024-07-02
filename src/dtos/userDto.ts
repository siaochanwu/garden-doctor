import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default class UserDTO {
  @IsNotEmpty()
  @Length(4, 20)
  username!: string;

  @IsNotEmpty()
  @Length(4, 100)
  password!: string;

  @IsEmail()
  email!: string;
}