# Wichtiger Docker-Commands


## Frontend-Service

### Image erstellen

```sh
cd frontend/
docker build -t m347-frontend .
```

### Interaktiven Entwickler-Container erstellen

Dieses Kommando erstellt einen interaktiven Container für den
Frontend-Dienst: Er startet eine `bash`-Shell anstelle des node-Prozesses:

```sh
cd frontend/
docker run --name m347-frontend -ti -v "$(pwd)":/server -p 3000:3000 m347-frontend bash
```

Diesen können wir nun auch starten / stoppen und wieder betreten:

```sh
docker stop m347-frontend
docker start m347-frontend
docker exec -ti m347-frontend bash
```
