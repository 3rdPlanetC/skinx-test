FROM node:20.12-alpine

WORKDIR /usr/src/app

ENV PORT=8080
ENV DB_HOST=mysql
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_PORT=3306
ENV DB_NAME=skinx_test

COPY . .

RUN yarn install

RUN yarn build

CMD ["npm", "run", "start"]