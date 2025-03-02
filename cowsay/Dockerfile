# Wir "erben" vom Image Debian, in der Version "stable-slim"
# Wir bauen also auf einem minimalen Debian-Linux auf:
FROM debian:stable-slim

# Wir führen Linux-Kommandos aus. Hier: Wir installieren ein benötigtes Software-Paket:
# - apt-get update: aktualisiert den Debian Paket-Cache
# - && führt rechtes Kommando aus, wenn linkes erfolgreich war
# - apt-get install -y cowsay: Installiert das Paket "cowsay"
RUN apt-get update && apt-get install -y cowsay

# wir kopieren notwendige Files von unserem lokalen Filesystem in das Image:
# Hier kopieren wir das lokale File message.txt ins Image unter /data/
COPY message.txt /data/message.txt

# Wir definieren, welcher Prozess beim Start eines Containers laufen soll:
# In unserem Beispiel ist es ein Prozess, der sich nach dem Start
# auch gleich wieder beendet (Container bleibt also nicht laufen):
# Dies ist optional, wenn das Parent-Image schon ein Kommando definiert:
CMD cat /data/message.txt | /usr/games/cowsay