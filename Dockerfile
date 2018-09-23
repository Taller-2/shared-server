FROM node:8.4.0
RUN mkdir /app
ADD . /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . ./
RUN npm install -g nodemon babel-cli
RUN npm i
WORKDIR /app/client
RUN npm i
WORKDIR /app
CMD ["npm", "start"]