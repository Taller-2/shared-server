FROM node:8.4.0
RUN mkdir /app
ADD . /app
WORKDIR /app
COPY . ./
RUN rm -rf node_modules
RUN  npm i
WORKDIR /app/client
RUN rm -rf node_modules
RUN  npm i
WORKDIR /app
CMD ["npm", "start"]