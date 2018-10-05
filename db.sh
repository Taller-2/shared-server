#!/bin/bash
NODE_ENV=test sequelize db:create
NODE_ENV=test sequelize db:migrate
sequelize db:create
sequelize db:migrate

