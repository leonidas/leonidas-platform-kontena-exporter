import Config from '../Config';
import * as request from 'superagent';


export interface Certificate {
  alt_names: string[];
  valid_until: string;
  auto_renewable: boolean;
  id: string;
  subject: string;
}


interface Kontena {
  getCertificates(): Promise<Certificate[]>;
}


export class ActualKontena implements Kontena {
  config: Config;

  constructor(config: Config = Config) {
    this.config = config;
  }

  async getCertificates(): Promise<Certificate[]> {
    const result = await request(`${this.config.kontena.masterUrl}/v1/grids/${this.config.kontena.gridName}/certificates`)
      .set('Authorization', `Bearer ${this.config.kontena.accessToken}`)
      .set('Accept', 'application/json');

    // TODO Validation
    return result.body.certificates;
  }
}


export class MockKontena implements Kontena {
  async getCertificates(): Promise<Certificate[]> {
    return [{
      alt_names: [],
      valid_until: '2018-03-29T17:17:46.000+00:00',
      subject: 'leonidasoy.fi',
      id: 'plat2-grid/leonidasoy.fi',
      auto_renewable: false,
    }];
  }
}


function getKontena(config: Config = Config): Kontena {
  if (config.nodeEnv === 'test') {
    return new MockKontena();
  } else {
    return new ActualKontena();
  }
}


const Kontena: Kontena = getKontena();
export default Kontena;
