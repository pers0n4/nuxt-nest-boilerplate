import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { build, loadNuxt } from "nuxt";
import { NuxtFastifyFilter } from "./nuxt.filter";
import { AppModule } from "./src/app.module";

async function bootstrap() {
  const isDev = process.env.NODE_ENV !== "production";

  const nest = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const nuxt = await loadNuxt(isDev ? "dev" : "start");

  if (isDev) {
    build(nuxt);
  } else {
    nuxt.ready();
  }

  nest.useGlobalFilters(new NuxtFastifyFilter(nuxt));
  nest.setGlobalPrefix("/api");

  await nest.listen(3000);
}
bootstrap();
