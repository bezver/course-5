import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/_schemas/User.schema";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>("JWT_SECRET_KEY"),
          signOptions: {
            expiresIn: config.get<string | number>("JWT_EXPIRATION_TIME"),
          },
        };
      },
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>("BLOGS_MAILER_HOST"),
            port: config.get<number>("BLOGS_MAILER_HOST_PORT"),
            secure: false,
            auth: {
              user: config.get<string>("BLOGS_MAILER_USER"),
              pass: config.get<string>("BLOGS_MAILER_PASSWORD"),
            },
          },
          defaults: {
            from: {
              name: config.get<string>("BLOGS_MAILER_EMAIL_SENDER"),
              address: config.get<string>("BLOGS_MAILER_EMAIL_ADDRESS"),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
