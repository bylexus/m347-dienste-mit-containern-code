# Notizen

## Wichtige Docker-Kommandos

### Monolith von Hand starten

```sh
cd monolith
npm install # einmalig, damit die Packages installiert sind
docker run --name m347-monolith -ti -v "$(pwd):/app" -w /app -p 3000:3000 node:20 node server.js
```

### Frontend-Container mit httpd-Server

```sh
cd frontend/
docker run --name m347-frontend -d -p 9090:80 -v "$(pwd)/site/":/usr/local/apache2/htdocs/ httpd
```

