import * as supertest from 'supertest';
import { getServer } from '..';


// tslint:disable-next-line:no-any
let server: any = null;


export function request() {
  if (!server) {
    server = getServer();
  }

  return supertest(server);
}
