declare module "nuxt" {
  import { IncomingMessage, ServerResponse } from "http";

  export class Nuxt {
    constructor(config: any);
    ready: () => Promise<void>;
    close: () => Promise<void>;
    render(req: IncomingMessage, res: ServerResponse): Promise<void>;
  }

  export class Builder {
    constructor(nuxt: Nuxt);
    build(): Promise<any>;
  }

  export function loadNuxt(loadOptions: any): Promise<Nuxt>;
  export function build(nuxt: Nuxt): Promise<any>;
}
