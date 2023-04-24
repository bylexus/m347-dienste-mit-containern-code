# Wichtiger Docker-Commands


## Frontend-Service

### Image erstellen

```sh
cd frontend/
docker build -t m347-frontend .
```

### Frontend-Container erzeugen

Nun erzeugen wir den Frontend-Container:

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

Netzwerk verbinden:

```sh
docker network connect m347 m347-frontend
```


## Feedback-Container

Unser Feedback-Dienst-Image wird mittels Dockerfile im Ordner `feedback/` erstellt:

```sh
cd feedback/
docker build -t m347-feedback .
```

Nun erzeugen wir den Feedback-Container:

```sh
cd feedback/
docker run --name m347-feedback -ti -v "$(pwd)":/server m347-feedback bash
```

... und starten unseren Feeback-Server:

```sh
sh    > docker exec -ti m347-feedback bash
docker> npm install
docker> node server.js
```

Netzwerk verbinden:

```sh
docker network connect m347 m347-feedback
```

## API-Container

Image bauen:

```sh
cd api/
docker build -t m347-api .
```

API-Container erzeugen:

```sh
cd api/
docker run --name m347-api -ti -v "$(pwd)":/server m347-api bash
```

Netzwerk verbinden:

```sh
docker network connect m347 m347-api
```

## DB-Container

Image bauen:

```sh
cd db/
docker build -t m347-db .
```

Persistentes Volume erzeugen:

```sh
cd db/
docker volume create m347-db
```

Container erstellen, starten:

```sh
docker run -d --name m347-db -v m347-db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=m347 --net m347 -p 2345:5432 m347-db
```

PG-Admin:

```sh
docker run --name m347-pgadmin -p 9999:80 -e 'PGADMIN_DEFAULT_EMAIL=m347@bztf.ch' -e 'PGADMIN_DEFAULT_PASSWORD=m347' --net m347 -d dpage/pgadmin4
```
