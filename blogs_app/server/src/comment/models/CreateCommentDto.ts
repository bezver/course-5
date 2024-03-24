import { IsMongoId } from "class-validator";
import { CommentDto } from "./CommentDto";

export class CreateCommentDto extends CommentDto {
  @IsMongoId()
  author: string;
}
