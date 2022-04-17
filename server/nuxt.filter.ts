import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from "@nestjs/common";
import { Nuxt } from "nuxt";

const acceptJson = (headers: any) =>
  ["/json", "+json"].some((segment) =>
    (headers.accept || "").includes(segment),
  );

@Catch(NotFoundException)
export class NuxtExpressFilter implements ExceptionFilter {
  private readonly nuxt: Nuxt;

  constructor(nuxt: Nuxt) {
    this.nuxt = nuxt;
  }

  public async catch(
    exception: NotFoundException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (acceptJson(req.headers)) {
      const status = exception.getStatus();
      res.status(status).send({
        message: exception.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    } else {
      if (!res.headersSent) {
        await this.nuxt.render(req, res);
      }
    }
  }
}

@Catch(NotFoundException)
export class NuxtFastifyFilter implements ExceptionFilter {
  private readonly nuxt: Nuxt;

  constructor(nuxt: Nuxt) {
    this.nuxt = nuxt;
  }

  public async catch(
    exception: NotFoundException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (acceptJson(req.raw.headers)) {
      const status = exception.getStatus();
      res.status(status).send({
        message: exception.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    } else {
      if (!res.headersSent) {
        await this.nuxt.render(req.raw, res.raw);
      }
    }
  }
}
