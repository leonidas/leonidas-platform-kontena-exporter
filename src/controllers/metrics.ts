import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

import formatMetrics from '../helpers/formatMetrics';
import { basicAuthRequired } from '../middleware/authentication';
import Kontena from '../services/Kontena';


async function getMetrics(ctx: Koa.Context) {
  const certificates = await Kontena.getCertificates();

  ctx.body = formatMetrics(certificates);
}


export default function initialize(router: KoaRouter) {
  router.get(
    'getMetrics',
    '/metrics',
    basicAuthRequired(),
    getMetrics
  );
}
