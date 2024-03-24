import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
