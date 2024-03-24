import { IsString, Length } from "class-validator";

export class LoginCredentials {
  @Length(4, 10)
  @IsString()
  username: string;

  @Length(4, 10)
  @IsString()
  password: string;
}
