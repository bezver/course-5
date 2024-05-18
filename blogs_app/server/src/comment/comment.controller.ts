import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import mongoose from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { PostService } from "src/post/post.service";
import { UserService } from "src/user/user.service";
import { CommentService } from "./comment.service";
import { CommentDto } from "./models/CommentDto";

@Controller("comments")
@UseGuards(AuthGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get()
  async list(@Query("postId") postId: string) {
    if (postId) {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new HttpException("Invalid post id", 400);
      }

      const post = await this.postService.getById(postId);
      if (!post) {
        throw new HttpException("Post not found", 404);
      }

      return this.commentService.listCommentsForPost(postId);
    }

    return this.commentService.listComments();
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid comment id", 400);
    }

    const comment = await this.commentService.getCommentById(id);
    if (!comment) {
      throw new HttpException("Comment not found", 404);
    }

    return comment;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Request() request: any, @Body() commentDto: CommentDto) {
    const author = request.user.id;

    if (!(await this.userService.getById(author))) {
      throw new HttpException("Unknown user", 401);
    }

    return await this.commentService.createComment({ author, ...commentDto });
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: string, @Request() request: any, @Body() commentDto: CommentDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid comment id", 400);
    }

    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new HttpException("Unknown user", 401);
    }

    return await this.commentService.updateComment(id, commentDto, user);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Request() request: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid comment id", 400);
    }

    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new HttpException("Unknown user", 401);
    }

    return await this.commentService.deleteComment(id, user);
  }
}
