import { Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginCredentials } from "./models/LoginCredentials";
import { RegisterCredentials } from "./models/RegisterCredentials";
import { UserIdentity } from "./models/UserIdentity";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post("register")
  @UsePipes(new ValidationPipe())
  async register(@Body() credentials: RegisterCredentials): Promise<void> {
    await this.authService.validateNewUser(credentials);

    const userDto = {
      username: credentials.username,
      email: credentials.email,
      passwordHash: await bcrypt.hash(credentials.password, 12),
    };

    const newUser = await this.userService.create(userDto);
    if (newUser) {
      this.authService.sendVerificationEmail(newUser);
    }
  }

  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(@Body() credentials: LoginCredentials): Promise<string> {
    const user = await this.authService.validateUser(credentials);
    return await this.jwtService.signAsync({ id: user._id });
  }

  @Post("verify-user")
  async verifyUser(@Body() data: { verificationToken: string }): Promise<string> {
    const { username } = await this.jwtService.verifyAsync(data.verificationToken, {
      secret: this.configService.get<string>("JWT_VERIFY_USER_SECRET_KEY"),
    });

    if (!username) {
      throw new Error("Verification token is invalid");
    }

    const user = await this.userService.getByName(username);
    if (user) {
      this.userService.update(user._id, { verified: true });
      return await this.jwtService.signAsync({ id: user._id });
    } else {
      throw Error("Verification token is invalid");
    }
  }

  @Post("send-reset-password-link")
  async sendResetPasswordLink(@Body() credentials: { username: string }): Promise<void> {
    const user = await this.userService.getByName(credentials.username);
    if (!user) {
      throw new Error("Unknown user");
    }

    this.authService.sendResetPasswordEmail(user);
  }

  @Post("reset-password")
  async resetPassword(@Body() data: { resetToken: string; password: string }): Promise<string> {
    const { username } = await this.jwtService.verifyAsync(data.resetToken, {
      secret: this.configService.get<string>("JWT_RESET_PASSWORD_SECRET_KEY"),
    });

    if (!username) {
      throw new Error("Token is invalid");
    }

    const user = await this.userService.getByName(username);
    if (!user) {
      throw new Error("Token is invalid");
    }
    if (!user.verified) {
      throw new Error("Email is not verified");
    }

    const userDto = {
      passwordHash: await bcrypt.hash(data.password, 12),
    };

    const updatedUser = await this.userService.update(user._id, userDto);
    return await this.jwtService.signAsync({ id: updatedUser._id });
  }

  @Post("get-identity-user")
  @UseGuards(AuthGuard)
  async getIdentityUser(@Request() request: any): Promise<UserIdentity> {
    const user = await this.userService.getById(request.user.id);

    // if (!user.verified) {
    //   throw new Error("Email is not verified");
    // }

    const userDto = {
      id: user._id,
      username: user.username,
    };

    return userDto;
  }
}
