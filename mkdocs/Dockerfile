FROM debian:stable-slim

WORKDIR /docs

RUN apt-get update && apt-get install -y python3 python3-venv python3-pip
RUN mkdir /venv
RUN python3 -m venv /venv
RUN /venv/bin/pip install mkdocs
CMD /venv/bin/mkdocs serve --dev-addr 0.0.0.0:8000
