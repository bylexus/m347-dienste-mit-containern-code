# Projektarbeit M347

Ziel dieses Moduls ist es, Ihnen die "**Container-Architektur**" näherzubringen.
Wir bauen dazu eine **monolithische** Beispiel-Applikation zu mehreren Einzeldiensten,
so genannten **Microservices**, um.

Dies werden wir im Laufe des Semesters schrittweise tun, im Rahmen eines übergreifenden Projektes, welches
Sie am Schluss als "Gesamtpaket" als Projektarbeit abliefern.

## Ziel des Gesamtprojektes

Wir bauen auf Ihrem **Webseiten-Projekt aus dem Modul M293** auf: Ziel ist, dass Sie Ihre Webseite folgendermassen ausbauen:

* Ihre Webseite wird aus **Templates (HTML, SCSS) als statische Webseite gebildet**
* Ihre Webseite wird von einem **"richtigen" Webserver ausgeliefert**
* Ihre Webseite beinhaltet ein **Feedback-Formular**. Diese Feedbacks werden per **Mail** an eine Mailbox versandt, und
  **in einer Datenbank** gespeichert.
* Ihre Webseite kann **Kommentare pro Detailseite** (z.B. Rückmeldung zu einem bestimmten Produkt) erfassen und anzeigen.
  Diese Kommentare werden pro Detailseite in einer Datenbank festgehalten und wieder an der korrekten Stelle (Seite) ausgeliefert.
* Sie **dokumentieren** die Gesamt-Architektur in einer `mkdocs`-Dokumentationsseite.

Wir erarbeiten dazu gemeinsam die notwendigen Kenntnisse, während dem Sie die finale Funktionalität dann selber
erarbeiten und als Projektarbeit abgeben.

## Ausgangslage

Wir beginnen mit einer monolithischen Architektur: Ein Server "macht alles": Frontend, Backend, Datenbank. Sie erhalten eine
kleine Beispiel-Applikation mit folgenden Komponenten:

<img src="/monolith_arch.svg" width="800">


* Sie erhalten einen **Web-Server** auf Basis **NodeJS** / **ExpressJS** (`monolith/server.js`).
* Dieser liefert:
	*  Ihre **statischen Seiten** (alles unter `[webroot]/`, also z.B. `http://localhost:3000/index.html`, oder auch `http://localhost:3000/images/bild1.png`)
	* ein Formular-Endpunkt `/feedback`: Dieser nimmt
		ein Formular-Wert entgegen und sendet den Inhalt an
		einen (Demo)-Maildienst
	* Einen API-Endpunkt für die **Erfassung** von Daten: `/api/save-text`: Dieser dient dem Demonstrieren eines Backend-Dienstes, um Daten in einer Datenbank zu speichern
	* Einen API-Endpunkt für die **Auslieferung** von Daten: `/api/get-texts`: Dieser dient dem Demonstrieren eines Backend-Dienstes, um Daten von einer Datenbank zu lesen

Ihre statischen Seiten erzeugen Sie mittels der aus M293 bekannten
**statischen Site-Generator**-Architektur.

Dieser Server ist **monolithisch** umgesetzt, er implementiert also alle Funktionalitäten selber als einzige, grosse Applikation.

Ihr **Client**, also der Browser, macht nur Verbindung(en) zu diesem einen Server.

Daneben steht diese `mkdocs`-Seite als separate Applikation zur Verfügung.

## Ziel-Architektur

Diese monolithische Architektur überführen Sie im Verlauf des Projektes in einzelne **Micro-Services**:


<img src="/microservice_arch.svg" width="800">

Die monolithische Demo-Applikation `server.js` soll in einzelne, in Container
verpackte Apps aufgetrennt werden:

* ein **Frontend**-Dienst liefert Ihre statische Seite, also HTML, CSS und weiteren statischen Content, aus.
* ein **Forms-Service** dient für die Entgegennahme Ihres Feedback-Formulars:
  Dieser Service soll:
	* den Formular-Inhalt an eine Mailadresse senden
	* den Formular-Inhalt in einer Datenbank-Tabelle zu Referenzzwecken speichern
* ein **Kommentar-Service** stellt ein **API** zur Verfügung, welche:
    * vorhandene Kommentare zu einer einzelnen Detailseite aus einer
	  Datenbank liest und dem Frontend als HTML-Snippet zur Verfügung stellt
	* Kommentare zu einer einzelnen Webseite entgegennehmen und in der
	  Datenbank speichern
* die **Datenbank** steht ebenfalls als Container-Dienst zur Verfügung.
* die **Dokumentation** steht weiterhin als Teil dieser Architektur zur Verfügung

Wir werden im Laufe des Semester die notwendigen Handwerkzeuge kennen lernen.
**Es obliegt aber in Ihrer Verantwortung, die bestehende Applikation soweit 
auszubauen / zu ergänzen, damit die geforderte Funktionalität abgebildet werden kann!**

## Ihre Aufgabe

Wie oben aufgezeigt ist es Ihre Aufgabe, die fertig umgebaute Applikation abzuliefern. Im Detail heisst dies:

* Sie erstellen die verschiedenen Container-Dienste wie oben gezeigt:
    * **Frontend-Seiten-Auslieferung**: ein Container, der die statischen Seiten beinhaltet und ausliefert
    * **Forms/Feedback-Service**: ein Container, der die Feedback-API-Funktionalität umsetzt. Das Speichern der Kommentare in der Datenbank müssen Sie als Teil der Projektarbeit noch selber umsetzen.
    * **Kommentar-Service**: ein Container, der die Kommentar-Funktion / API umsetzt. Diese Funktionalität müssen Sie als Teil der Projektarbeit selber umsetzen.
	* **Datenbank-Service**: dieser Container stellt eine PostgreSQL-Datenbank zur Verfügung. Diesen Container erstellen wir im Verlauf des Semesters. Das notwendige Datenbank-Schema dazu müssen Sie als Teil der Projektarbeit selber umsetzen
	* **mkdocs-Container**: Dieser Container stellt die laufende `mkdocs`-Dokumentation zur Verfügung
* Sie erstellen die notwendigen Scripte / Compose-Files, um alle Dienste
	miteinander zu starten / zu koordinieren
* Sie liefern den gesamten Code inkl. dazu notwendiger Docker- und Compose-File und Dokumentation im **Classroom-Git-Repository** ab.
* Sie dokumentieren die Architektur und die einzelnen Dienste in der `mkdocs`-Dokumentation, welche ebenfalls Teil des Respository ist.


## Abgabe

Sie geben den **gesamten Code inkl. Dokumentation, Konfiguration und Datenbank-Scripte** via gihub classroom-Repository ab. Ihr git-Repository sollte beinhalten:

* Die Dokumentation als `mkdocs`-Dokumentation
* Alle Scripte, Dateien und Konfigurationen, um alle Container-Dienste
  zu bauen resp. zu starten:
  * Frontend-Container mit der statischen Webseite, welche den Forms-Service
    und den Kommentar-Service (pro Detailseite) nutzt
  * Forms-Container mit dem Forms-API für Mail + DB-Eintrag
  * Kommentar-Container mit dem Kommentar-API
  * Datenbank-Container für die PostgreSQL-Datenbank
	* Dazu gehört ein init-Script, welches das Datenbank-Schema beim Erstellen des Containers erzeugt (siehe <https://hub.docker.com/_/postgres/>, Abschnitt "Initialization Scripts")
  * mkdocs-Container, der die Dokumentation als Dienst bereitstellt

Ihr Repository muss alles notwendige liefern, damit ich die Dienste starten kann.

Ich werde folgendes ausführen:

```sh
git clone /url/zu/ihrem/repo
cd [ihr-repo]
docker compose up
```

Danach müssen die Dienste alle gebaut sein und laufen, inkl. der notwendigen
Port-Weiterleitungen.

**Sollten Sie für den Setup spezielle Instruktionen liefern wollen, erwarte ich ein README.md-File im obersten Verzeichnis des Repository!**

### Dokumentation

Ich erwarte eine Dokumentation in Form eines `mkdocs`-Markdown-Containers. Die Dokumentation zeigt von Ihrem Projekt folgendes:

* **Bedienungshinweise:**<br>
  Falls Ihre Applikation zum Erstellen / Builden / Starten spezielle Instruktionen benötigt, dokumentieren Sie diese.
* **Diagramm und Beschreibung der Systemarchitektur:**<br>
  Sie zeigen eine schematische Darstellung der gesamten Systemarchitektur. Es muss ersichtlich sein, welche Systeme / Dienste
  vorhanden sind und welche wie miteinander kommunizieren. Dazu gehört eine textuelle Beschreibung der Dienste und deren Funktionen.
* **Beschreibung der einzelnen Dienste**:<br>
  Beschreiben Sie die Funktion der einzelnen Dienste und deren Aufgabe im Gesamtsystem.
* **Beschreiben der eingesetzten Container-Technologien:**<br>
  Beschreiben Sie, welche Container welche Container-Technologien benutzt, und warum:
  * Welche Dienste benötigen Bound Volumes, welche benötigen Docker-Volumes? Warum?
  * Welche Dienste benötigen ein Docker-Network, und wie haben Sie dieses konfiguriert?
  * Welche Dienste exponieren Netzwerk-Ports "gegen aussen", und warum?
  * Wie / über welche "Kanäle" kommunizieren die Container untereinander?
  * Wie erstellen Sie die Images der einzelnen Container?
* **Sicherheitskonzepte:**<br>
  Beschreiben Sie, welche Gedanken zur Sicherheit Sie sich gemacht haben: Welche Dienste / Container
  haben Sie wie geschützt? Vor was haben Sie sie geschützt? Und wie? Es muss ersichtlich sein,
  welche Sicherheitskonzepte Sie bedacht / umgesetzt haben.
* **Beschreiben eines Backup-Konzeptes:**<br>
  Wie kann von Ihrer Gesamt-Applikation ein Backup, eine Datensicherung erstellt werden? Erstellen Sie
  ein Konzept, welches das technische Vorgehen dazu beschreibt, nach Möglichkeit im laufenden Betrieb (ohne Unterbruch).



## Bewertung

**ICT LBV Modul 347-1 LB 2 - 60% der Modulnote**

(siehe https://gitlab.com/ict-modulformation-ch/module/m347/lbv-m-347-1)

Die Bewertung erfolgt mittels separatem Bewertungsblatt, welches via Moodle abgegeben wird / ersichtlich ist.