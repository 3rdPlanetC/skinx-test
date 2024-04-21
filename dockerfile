FROM node:20.12-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/app

ENV PORT=8080
ENV DB_TYPE=mysql
ENV DB_HOST=mysql
ENV DB_USER=root
ENV DB_PASS=root
ENV DB_PORT=3306
ENV DB_NAME=skinx_test
# ENV DATABASE_URL="${DB_TYPE}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}/${DB_NAME}}"
ENV DATABASE_URL="mysql://root:root@mysql:3306/skinx_test"

COPY . .

RUN yarn install

RUN yarn build

CMD ["./wait-for-it.sh", "mysql:3306", "--", "./scripts/prisma.sh"]

# ENTRYPOINT [ "npm", "run", "prisma:full" ]