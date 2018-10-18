#!/bin/bash
docker exec -it $(docker ps | grep dev_web | awk '{ print $1 }') /bin/sh -c 'node scripts/db/liftDb.js'