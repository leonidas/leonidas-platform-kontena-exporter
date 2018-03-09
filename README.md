# Leonidas Platform Kontena Exporter

[![Build Status](https://drone.plat2.leonidasoy.fi/api/badges/leonidas/leonidas-platform-kontena-exporter/status.svg)](https://drone.plat2.leonidasoy.fi/leonidas/leonidas-platform-kontena-exporter)

Exports useful metrics from Kontena Master into Prometheus.

## Features

* `certificate_validity_seconds{subject="example.com"}` – Validity of TLS certificates managed by Kontena

Please submit further metrics via pull requests.

## Getting Started

### Docker Compose

    docker-compose up

    alias dc-test="docker-compose -f docker-compose.test.yml up --build --exit-code-from=test"
    dc-test

### Manually

    npm install
    npm test
    npm start

## Configuration

Via environment variables. See [Config.ts](https://github.com/leonidas/leonidas-platform-kontena-exporter/blob/master/src/Config.ts).

## API

### GET `/metrics`

Response:

```
# HELP certificate_validity_seconds Amount of seconds the certificate will still be valid for
# TYPE certificate_validity_seconds gauge
certificate_validity_seconds{subject="leonidasoy.fi"} 1749873
```

## Deployment

This project is using the [Leonidas Platform Drone CI](https://drone.plat2.leonidasoy.fi/leonidas/leonidas-platform-kontena-exporter). All pushes to `master` will trigger a production deployment.

If you need to deploy manually, the command to deploy from your working copy is

    ./deploy.sh

## TODO

### Untyped packages

Write type wrappers or get rid of.

* [ ] `winston-console-formatter`
* [ ] `koa-request-logger`
