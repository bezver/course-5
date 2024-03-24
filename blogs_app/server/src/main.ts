import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppExceptionsFilter } from "./filters/AppExceptionsFilter";

async function main() {
  const app = await NestFactory.create(AppModule);

  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AppExceptionsFilter(adapterHost));

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");
  app.enableCors({
    origin: configService.get<string>("ALLOWED_ORIGIN"),
    credentials: true,
  });
  await app.listen(port);
}

main();
