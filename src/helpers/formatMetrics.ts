import { Certificate } from '../services/Kontena';
import {ZonedDateTime, ChronoUnit, Clock } from 'js-joda';
import Config from '../Config';


function getNow(config: Config = Config) {
  if (config.nodeEnv === 'test') {
    return ZonedDateTime.parse('2018-03-09T13:13:13.000+02:00');
  } else {
    return ZonedDateTime.now(Clock.systemDefaultZone());
  }
}


function getValidity(certificate: Certificate, now: ZonedDateTime): number {
  const validUntil = ZonedDateTime.parse(certificate.valid_until);

  return now.until(validUntil, ChronoUnit.SECONDS);
}


export default function formatMetrics(certificates: Certificate[], now?: ZonedDateTime) {
  const _now: ZonedDateTime = now || getNow();

  return [
    '# HELP certificate_validity_seconds Amount of seconds the certificate will still be valid for',
    '# TYPE certificate_validity_seconds gauge',
    ...certificates.map(certificate => `certificate_validity_seconds{subject="${certificate.subject}"} ${getValidity(certificate, _now)}`),
  ].join('\n') + '\n';
};
