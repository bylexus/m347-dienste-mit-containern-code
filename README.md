# Modul M347 - Dienste mit Containern

Dies ist das Einstiegsprojekt für das Modul M347. Es besteht aus:

* `docsify`: Einem [docsify](https://docsify.js.org/)-Gerüst für die Erstellung der Projektdokumentation
* `monolith`: Einem Einstiegs-Projekt, als monolithische Applikation implementiert,
	welche im Lauf des Moduls in mehrere Dienste aufgetrennt wird.


Die monolithische Applikation besteht aus:

* einem kleinen nodejs-Webserver (expressjs), welcher eine statische (HTML-)Site ausliefern kann und eine Demo-API-Route implementiert, um:
  * eine Backend-API zu demonstrieren
  * den Datenbank-Zugriff zu demonstrieren
* einem Mail-Dienst. Dieser kann extern sein, wir verwenden beispielhaft ethereal.email
* **Anmerkung**: die statische Seite übernehmen / bauen wir mit dem Projekt aus dem letzten Model (M293): dazu haben Sie damals eine Site mittels einem static site builder [11ty](https://www.11ty.dev/) gebaut, welcher die Frontend-Webseite bildet / generiert

## Bilden der statischen Webseite

Der Frontend-Teil besteht aus der statisch gebildeten Webseite, welche der Server
unter `monolith/site/` ausliefert. Im letzten Modul M293 haben wir eine statische
Seite erstellt, damals mit dem Static Site Builder **eleventy.js**.

Wir benutzen die Static-Site-Builder-Infrastruktur aus dem letzten Modul M293:
Diese bildet anhand von Templates die Seite unter `monolith/src/` als
fertig generierte HTML-Seiten nach `monolith/site/`.

```sh
$ cd monolith/
$ npm install  # einmalig
$npm run build # bildet monolith/src/ --> monolith/site/
```

Dies erstellt / kopiert die statischen Webseiten-Files nach `monolith/site`,
wo sie vom Server (siehe unten) ausgeliefert werden können.

Wenn das Docker-Image verwendet wird, kann dies folgendermassen angestossen werden:


```sh
# unter unix-artigen Systemen:
$ cd monolith/
$ docker run --rm -ti -v "$(pwd)":/app -w /app node:20 bash
docker> npm install
docker> npm run build

# unter Windows:
$ cd monolith/
$ docker run --rm -ti -v "%cd%":/app -w /app node:20 bash
docker> npm install
docker> npm run build

# unter Windows mit PowerShell:
$ cd monolith/
$ docker run --rm -ti -v "$pwd":/app -w /app node:20 bash
docker> npm install
docker> npm run build
```


## Starten des Monolithen

Die monolithische Applikation kann mit dem `server.js`-Script gestartet werden. Es startet einen
kleinen Webserver, basierend auf NodeJS / ExpressJS, und liefert die statischen Seiten unter `site` aus:

```sh
$ cd monolith/
$ npm install # einmalig
$ node server.js
```

Oder mittels einem Docker-Image (Hier: NodeJS 20-Image vom dockerhub):

```sh
# unter unix-artigen Systemen:
$ cd monolith/
$ docker run --rm -ti -v "$(pwd)":/app -w /app -p 3000:3000 node:20 node server.js

# unter Windows:
$ cd monolith/
$ docker run --rm -ti -v "%cd%":/app -w /app -p 3000:3000 node:20 node server.js

# unter Windows mit PowerShell:
$ cd monolith/
$ docker run --rm -ti -v "$pwd":/app -w /app -p 3000:3000 node:20 node server.js
```

Der Server läuft nun auf TCP Port `3000` und liefert Ihre statische Seite unter `monolith/site/` aus.

## Starten / Nutzen der docsify-Dokumentation

Im Verlauf des Semesters wird mittels [docsify](https://docsify.js.org/) eine Dokumentation erstellt. Ziel ist, die
Doku auch als eigenen Dienst / Container zu bauen.

Wir werden docsify im Verlauf des Semesters als Docker-Container umsetzen.

In der Zwischenzeit können Sie docsify mittels npm lokal installieren und starten:

```sh
npm install -g docsify-cli
cd docsify
docsify serve
```


Ein minimalistisches Dockerfile für einen Docsify-Container sieht folgendermassen aus:

```Dockerfile
#  minimal docsify docker
# build image with:
#   docker build -t m347-docsify .
# create and start container with:
#  docker run --name m347-docsify -t -v "$(pwd):/app" -w /app -p 3000:3000 m347-docsify
FROM node:20

EXPOSE 3000
RUN npm install -g docsify-cli@4
WORKDIR /app
CMD ["docsify", "serve", "."]

```

Gestartet wird der Container dann so:

```sh
$ docker build -t m347-docsify /pfad/zum/Ordner/Des/Dockerfile/
$ docker run --rm -ti -v /pfad/zum/mkdocs/folder:/docs -p 8000:8000 m293-mkdocs
# Powershell:
$ docker run --name m347-docsify -v "${pwd}:/app" -w /app -p 3000:3000 m347-docsify
# Unix bash:
$ docker run --name m347-docsify -v "$(pwd):/app" -w /app -p 3000:3000 m347-docsify
```

Dies wird im Laufe des Semesters eingeführt.

## Ziel für den Ausbau

Wir behandeln in diesem Modul Dienste mit Containern. Wir nehmen dazu Ihre Projektarbeit aus dem letzten Modul M293,
und bauen diese statische Seite aus:

* ein Container liefert Ihre statische Seite aus (Schritt 1)
* ein Formular-Dienst-Container nimmt Daten aus einem Feedback-Formular entgegen, und
  * schickt diese als Email an eine Adresse (Schritt 2)
  * speichert das Feedback in einer Datenbank (Schritt 3)
* ihre Webseite soll Kommentaren auf den einzelnen Seiten anbieten können: dazu
	entwickeln Sie einen weiteren Dienst als Container, welcher Kommentare pro Seite entgegennehmen / ausliefern kann

Ziel ist, dass die jetzt monolithische Applikation in ein paar "Micro-Services" aufgetrennt wird, welche
als Container-Dienste zusammenspielen.
