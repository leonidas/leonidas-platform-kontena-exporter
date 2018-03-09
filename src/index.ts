import * as Koa from 'koa';
import * as passport from 'koa-passport';
import * as KoaRouter from 'koa-router';


import Config from './Config';
import router from './controllers';
import setupPassport from './middleware/authentication';
import Logger, { requestLogger } from './services/Logger';


export type Context = Koa.Context & KoaRouter.IRouterContext & passport.Context;
export type Next = () => Promise<void>;


async function notFound(ctx: Context) {
  ctx.status = 404;
  ctx.body = { message: 'Not Found' };
}


export function makeApp(): Koa {
  const theApp = new Koa();

  setupPassport();

  theApp.use(requestLogger);
  theApp.use(passport.initialize());
  theApp.use(passport.session());
  theApp.use(router.routes());
  theApp.use(notFound);

  return theApp;
}


const app = makeApp();
export default app;


export function getServer(config: Config = Config) {
  const { address, port } = config.listen;

  Logger.info(`Starting kontena-exporter at ${address}:${port}`, config);
  return app.listen(port, address);
}


export function start() {
  return getServer();
}


if (require.main === module) {
  start();
}
