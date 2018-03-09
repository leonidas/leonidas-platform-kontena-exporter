import * as winston from 'winston';


type NodeEnv = 'development' | 'production' | 'test';


interface Config {
  kontena: {
    masterUrl: string;
    gridName: string;
    accessToken: string;
  };
  listen: {
    port: number;
    address: string;
  };
  nodeEnv: NodeEnv;
  logLevel: winston.CLILoggingLevel;
  user: {
    username: string;
    password: string;
  };
}


function makeConfig(env: typeof process.env = process.env): Config {
  let nodeEnv: NodeEnv = 'development';

  switch(process.env.NODE_ENV) {
    case undefined:
    case '':
      nodeEnv = 'development';
      break;

    case 'development':
    case 'production':
    case 'test':
      nodeEnv = process.env.NODE_ENV;
      break;

    default:
      throw new Error(`unrecognized NODE_ENV: ${process.env.NODE_ENV}`);
  }

  let logLevel: winston.CLILoggingLevel = 'debug';

  switch(process.env.KONTENA_EXPORTER_LOG_LEVEL) {
    case undefined:
    case '':
      logLevel = 'info';
      break;

    case 'debug':
    case 'info':
    case 'warn':
    case 'error':
      logLevel = process.env.KONTENA_EXPORTER_LOG_LEVEL;
      break;

    default:
      throw new Error(`unrecognized KONTENA_EXPORTER_LOG_LEVEL: ${process.env.KONTENA_EXPORTER_LOG_LEVEL}`);
  }

  return {
    kontena: {
      masterUrl: process.env.KONTENA_EXPORTER_MASTER_URL || 'https://master.plat2.leonidasoy.fi',
      gridName: process.env.KONTENA_EXPORTER_GRID_NAME || 'plat2-grid',
      accessToken: process.env.KONTENA_EXPORTER_ACCESS_TOKEN || 'secret',
    },
    listen: {
      address: process.env.KONTENA_EXPORTER_LISTEN_ADDRESS || '127.0.0.1',
      port: parseInt(process.env.KONTENA_EXPORTER_LISTEN_PORT || '3000', 10),
    },
    logLevel,
    nodeEnv,
    user: {
      username: process.env.KONTENA_EXPORTER_USERNAME || 'prometheus',
      password: process.env.KONTENA_EXPORTER_PASSWORD || 'secret',
    },
  };
}


const Config = makeConfig();
export default Config;
