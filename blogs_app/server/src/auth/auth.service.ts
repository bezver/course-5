import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/_schemas/User.schema";
import { UserService } from "src/user/user.service";
import { LoginCredentials } from "./models/LoginCredentials";
import { RegisterCredentials } from "./models/RegisterCredentials";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async validateNewUser(credentials: RegisterCredentials): Promise<void> {
    if (await this.userService.getByName(credentials.username)) {
      throw new Error("Username already in use");
    }

    if (await this.userService.getOne({ email: credentials.email })) {
      throw new Error("Email already in use");
    }
  }

  async validateUser(credentials: LoginCredentials): Promise<User> {
    const user = await this.userService.getByName(credentials.username);
    if (!user) {
      throw new Error("Invalid username");
    }

    if (!(await bcrypt.compare(credentials.password, user.passwordHash))) {
      throw new Error("Invalid password");
    }

    // if (!user.verified) {
    //   this.sendVerificationEmail(user);
    //   throw new Error("You need to confirm your email address");
    // }

    return user;
  }

  async sendVerificationEmail(user: User): Promise<void> {
    const token = await this.jwtService.signAsync(
      { username: user.username },
      { expiresIn: "5m", secret: this.configService.get<string>("JWT_VERIFY_USER_SECRET_KEY") },
    );

    const mail = {
      to: user.email,
      subject: "Blogs: Account Confirmation",
      text: `${this.configService.get<string>("ALLOWED_ORIGIN")}/verify-user/${token}`,
    };

    await this.mailerService.sendMail(mail);
  }

  async sendResetPasswordEmail(user: User): Promise<void> {
    const token = await this.jwtService.signAsync(
      { username: user.username },
      { expiresIn: "5m", secret: this.configService.get<string>("JWT_RESET_PASSWORD_SECRET_KEY") },
    );

    const mail = {
      to: user.email,
      subject: "Blogs: Password Reset",
      text: `${this.configService.get<string>("ALLOWED_ORIGIN")}/reset-password/${token}`,
    };

    await this.mailerService.sendMail(mail);
  }
}
