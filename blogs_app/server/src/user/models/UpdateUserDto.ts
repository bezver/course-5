import { IsBoolean, IsString } from "class-validator";

export class UpdateUserDto {
  @IsBoolean()
  verified?: boolean;

  @IsString()
  passwordHash?: string;
}
