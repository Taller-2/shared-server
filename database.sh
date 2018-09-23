#!/bin/bash
docker exec -it $(docker ps | grep dev_web | awk '{ print $1 }') /bin/sh -c 'npm run db:create'
docker exec -it $(docker ps | grep dev_web | awk '{ print $1 }') /bin/sh -c 'npm run db:migrate'
docker exec -it $(docker ps | grep dev_web | awk '{ print $1 }') /bin/sh -c 'npm run model:create'