#!/bin/bash
set -xue
docker-compose build
docker-compose push
kontena stack upgrade --deploy kontena-exporter kontena.yml
