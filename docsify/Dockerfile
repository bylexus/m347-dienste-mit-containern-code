FROM node:22

RUN apt-get update && apt-get dist-upgrade -yy
RUN npm install -g docsify-cli

WORKDIR /app

CMD docsify serve --port 10000
