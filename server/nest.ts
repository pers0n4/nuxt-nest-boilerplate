import { ServerResponse } from "http";
import { IncomingMessage } from "connect";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { FastifyInstance } from "fastify";
import { AppModule } from "./src/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.init();

  const fastify: FastifyInstance = app.getHttpAdapter().getInstance();
  await fastify.ready();

  return function (req: IncomingMessage, res: ServerResponse) {
    fastify.server.emit("request", req, res);
  };
}

export default bootstrap;
