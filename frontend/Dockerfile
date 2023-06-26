FROM node:16
WORKDIR /server

COPY package.json /server/package.json
COPY site/ /server/site/
COPY src/ /server/src/
COPY server.js /server/server.js
COPY config/ /server/config/
COPY gulpfile.js /server/gulpfile.js

RUN npm install && npm run build

USER node

CMD node server.js

