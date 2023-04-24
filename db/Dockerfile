FROM postgres:15

COPY init-db.sql /docker-entrypoint-initdb.d/init-db.sql


# Ziel:
# - laufenden Container bauen
# - mit persistent volume: /var/lib/postgresql/data (im container)
# - im m347-Docker-Netzwerk integriert


### docker build -t m347-db .
### docker run command to start this image:
### docker volume create m347-db
### docker run -d --name m347-db --hostname db -v m347-db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=m347 -p 2345:5432 m347-db
### pgadmin:
### docker run --name m347-pgadmin -p 9999:80 -e 'PGADMIN_DEFAULT_EMAIL=m347@bztf.ch' -e 'PGADMIN_DEFAULT_PASSWORD=m347' -d dpage/pgadmin4