import mongoose from "mongoose";
import { AuthGuard } from "src/auth/auth.guard";
import { Controller, Get, HttpException, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.list();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException("Invalid user id", 400);
    }

    const user = this.userService.getById(id);
    if (!user) {
      throw new HttpException("User not found", 404);
    }

    return user;
  }
}
