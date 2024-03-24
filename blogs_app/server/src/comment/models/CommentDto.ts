import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsMongoId()
  post: string;
}
