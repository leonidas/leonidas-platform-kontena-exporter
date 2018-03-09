import * as passport from 'koa-passport';
import * as passportHttp from 'passport-http';

import Logger from '../services/Logger';
import Config from '../Config';

const BasicStrategy = passportHttp.BasicStrategy;


type Done = (err: Error | null, user: User | false) => void;


interface User {
  username: string;
}


export class UsernameOrPasswordWrong extends Error {
  public readonly username: string;

  constructor(username: string) {
    super(`Username or password wrong: ${username}`);
    this.username = username;

    // tslint:disable-next-line:max-line-length
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, UsernameOrPasswordWrong.prototype);
  }
}



async function handleAuth(username: string, password: string, done: Done) {
  Logger.debug('Login attempt with username', username);

  if (username === Config.user.username && password === Config.user.password) {
    const user: User = { username };
    Logger.debug('Login successful', user);
    done(null, user);
  } else {
    Logger.warn('Username or password wrong');
    return done(null, false);
  }
}


export default function setupPassport() {
  passport.use('basic', new BasicStrategy(handleAuth));

  passport.serializeUser((user: User, done) => done(null, user.username));
  passport.deserializeUser((username: string, done) => done(null, { username }));
}


export function basicAuthRequired() {
  return passport.authenticate('basic', { session: false });
}
