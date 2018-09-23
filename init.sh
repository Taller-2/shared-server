#!/bin/bash
echo "BUILDING DOCKER IMAGE"
docker build -t shared-server-img .
echo "LAUNCHING DOCKER CONTAINER"
sh ./dev.sh
sh ./database.sh