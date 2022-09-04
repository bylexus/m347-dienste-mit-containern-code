/**
 * Modul M347 - Dienste mit Containern
 *
 * Dies ist der Frontend-Dienst, welcher die statische (Frontend-)Webseite ausliefert.
 *
 * - alle Dateien unter site/ werden als statischen Content ausgeliefert
 * 
 * Dies ist der erste Schritt vom Monolith zur Microservice-Architektur.
 *
 * (c) Alexander Schenkel, alexander.schenkel@bztf.ch
 */
const express = require("express");
const config = require("./config/config.js");

const app = express();
const port = config.server.port;

/** ------------------- URL-Routen und -Handler konfigurieren -------------------- */

// statische (Frontend)-Site: alle Files unter site/ werden
// als statische Dateien ausgeliefert:
// Diesen Teil wollen wir später vom Backend-Server lösen:
app.use(express.static("site"));

// ---------------------------------------------------------------
// Starten des Servers:
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// ---------------------------------------------------------------

