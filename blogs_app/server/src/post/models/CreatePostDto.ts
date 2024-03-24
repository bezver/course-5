import { IsMongoId } from "class-validator";
import { PostDto } from "./PostDto";

export class CreatePostDto extends PostDto {
  @IsMongoId()
  author: string;
}
