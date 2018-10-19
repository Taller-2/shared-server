FROM node:8.4.0
#RUN psql -c "CREATE USER postgres WITH PASSWORD 'postgres';" -U postgres
#RUN psql -c "CREATE DATABASE development;" -U postgres
ADD . /usr/src/app
WORKDIR /usr/src/app
COPY . ./
RUN rm -rf node_modules
RUN  npm i
RUN npm install -g sequelize-cli
RUN npm install --save sequelize-cli
RUN git clone https://github.com/vishnubob/wait-for-it.git
WORKDIR /usr/src/app/client
RUN rm -rf node_modules
RUN  npm i
WORKDIR /usr/src/app
CMD ["npm", "start"]