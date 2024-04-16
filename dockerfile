FROM node:20.12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 8080


CMD ["npm", "run", "dev"]