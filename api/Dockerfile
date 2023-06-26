FROM node:16

WORKDIR /server

## alle notwendigen Dateien in das Image kopieren:

COPY config.js /server/config.js
COPY package.json /server/package.json
COPY package-lock.json /server/package-lock.json
COPY server.js /server/server.js

## notwendige Pakete installieren:
RUN npm install

## nun wechseln wir zu einem nicht-root-User:

USER 1000

## RUN-Command beinhaltet nun nur noch das Server-Start-Kommando:
## alle notwendigen Dateien sind nun bereits Teil des Images:
CMD node server.js
