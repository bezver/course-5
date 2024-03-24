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
import { UserService } from "src/user/user.service";
import { PostDto } from "./models/PostDto";
import { PostService } from "./post.service";

@Controller("posts")
@UseGuards(AuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async list(@Query("userId") userId: string) {
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new HttpException("Invalid user id", 400);
      }

      const user = await this.userService.getById(userId);
      if (!user) {
        throw new HttpException("User not found", 404);
      }

      return this.postService.listPostsByAuthor(userId);
    }

    return this.postService.listPosts();
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid post id", 400);
    }

    const post = await this.postService.getById(id);
    if (!post) {
      throw new HttpException("Post not found", 404);
    }

    return post;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Request() request: any, @Body() postDto: PostDto) {
    const author = request.user.id;

    if (!this.userService.getById(author)) {
      throw new HttpException("Unknown user", 401);
    }
    return this.postService.create({ author, ...postDto });
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: string, @Request() request: any, @Body() postDto: PostDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid post id", 400);
    }

    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new HttpException("Unknown user", 401);
    }

    return await this.postService.update(id, postDto, user);
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Request() request: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid post id", 400);
    }

    const user = await this.userService.getById(request.user.id);
    if (!user) {
      throw new HttpException("Unknown user", 401);
    }

    return await this.postService.delete(id, user);
  }
}
