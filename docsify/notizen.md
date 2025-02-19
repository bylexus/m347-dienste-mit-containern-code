# Notizen

z.B. Docker-Kommandos, Konzepte, .....


* eins
* zwei
* drei

### Starten von docsify, ohne Docker:

```sh
cd pfad/zum/projekt/docsify
npm install -g docsify-cli
docsify serve
``` 

### Starten einer einfachen Ubuntu-Instanz:

```
docker run --rm -ti ubuntu bash
```

### Starten des Monolith:

```
docker run --rm -ti -v "$(pwd):/app" -w /app -p 3000:3000 node:20 bash
```

**fett**, ~~kursiv~~