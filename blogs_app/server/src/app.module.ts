import { AuthModule } from "./auth/auth.module";
import { CommentModule } from "./comment/comment.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_SERVER_URL"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PostModule,
    CommentModule,
    UserModule,
  ],
})
export class AppModule {}
