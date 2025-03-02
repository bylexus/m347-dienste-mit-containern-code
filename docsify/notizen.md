# Notizen

## Wichtige Docker-Kommandos

### Monolith

Erstmalig: Container erstellen und starten:

```sh
cd monolith
npm install # einmalig, damit die Packages installiert sind
docker run --name m347-monolith -ti -v "$(pwd):/app" -w /app -p 3000:3000 node:20 node server.js
```

Wenn erstellt, dann stoppen/starten mit:

```sh
docker stop m347-monolith
docker start m347-monolith
```

### Frontend-Container mit httpd-Server

Erstmalig: Container erstellen und starten:

```sh
cd frontend/
docker run --name m347-frontend -d -p 8000:80 -v "$(pwd)/site/":/usr/local/apache2/htdocs/ httpd
```

Wenn erstellt, dann stoppen/starten mit:

```sh
docker start m347-frontend
docker stop m347-frontend
```

### Docsify-Image / Container

**Image bauen:**

```sh
cd docsify/
docker build -t m347-docsify .
```

**Container erstellen und starten:**

```sh
cd docsify/
docker run --name m347-docsify -d -ti -v "$(pwd):/app" -w /app -p 10000:10000 m347-docsify
```

Wenn erstellt, dann stoppen/starten mit:

```sh
docker start m347-docsify
docker stop m347-docsify
```