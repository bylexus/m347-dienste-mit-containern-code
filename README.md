# Modul M347 - Dienste mit Containern

Dies ist das Übungsprojekt für das Modul M347. Ziel ist das Aufteilen einer monolithischen Applikation
in kleine Micro-Services mit Containern.

## Aktueller Stand

Dieser Repository-Stand deckt folgende Dienste ab:

* `/frontend`: Die statische Frontend-Webseite, ausgeliefert von einem kleinen NodeJS-Server
* `/feedback`: Der Feedback-Dienst, bedient die Route `/feedback`, und sendet das Feedback an einen Mail-Account. Umgesetzt mit einem kleinen NodeJS-Server.
* `/monolith`: Der Rest der monolithischen Applikation (momentan: nur noch der API-Dienst).

## Starten und Verbinden der Dienste

Die Dienste / Container müssen momentan noch von Hand erstellt/gestartet/verbunden werden (gewünscht). Automation / docker compose wird
später eingeführt.

### Frontend-Dienst:

Docker-Image erstellen:

```sh
shell> cd frontend
shell> docker build -t m347-frontend .
```

Docker-Container erstellen, manuelles Starten der Applikation:

```sh
shell > docker run --name m347-frontend --hostname frontend -ti -v "$(pwd)":/server -p 3000:3000 m347-frontend bash
docker> npm install
docker> node server.js
```

Das Frontend steht nun unter http://localhost:3000 zur Verfügung.


### Feedback-Dienst:

Docker-Image erstellen:

```sh
shell> cd feedback
shell> docker build -t m347-feedback .
```

Docker-Container erstellen, manuelles Starten der Applikation:

```sh
shell > docker run --name m347-feedback --hostname feedback -ti -v "$(pwd)":/server m347-feedback bash
docker> npm install
docker> node server.js
```

Der Feedback-Dienst ist gestartet, aber nicht als Dienst exponiert. Ziel ist, dass das Frontend den Dienst via Docker-Network und Reverse-Proxy erreicht.

### Docker-Network erstellen, verbinden

Der Frontend-Dienst leitet Client-Anfragen intern via Reverse-Proxy an den Feedback-Dienst weiter. Dazu müssen die beiden Dienste
mit einem Docker-Network verbunden werden:

```sh
shell > docker network create m347
shell > docker network connect m347 frontend
shell > docker network connect m347 feedback
# falls vorhanden:
shell > docker network connect m347 monolith
```

(c) 2022 Alexander Schenkel, BZT Frauenfeld, alexander.schenkel@bztf.ch
