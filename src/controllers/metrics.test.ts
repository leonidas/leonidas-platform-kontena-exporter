import * as assert from 'assert';
import { request } from '../helpers/test';
import Config from '../Config';


function getMetrics(config: Config = Config) {
  return request()
    .get('/metrics')
    .auth(config.user.username, config.user.password)
    .expect(200);
}


describe('/metrics', () => {
  describe('GET', () => {
    it('returns Prometheus metrics', async () => {
      const response = await getMetrics();
      console.log(response.text);
      assert(response.text.indexOf('certificate_validity_seconds{subject="leonidasoy.fi"} 1749873') >= 0);
    });
  });
});
