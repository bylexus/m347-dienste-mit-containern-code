FROM debian:stable-slim

RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install mkdocs

WORKDIR /docs

CMD mkdocs serve --dev-addr 0.0.0.0:8000
