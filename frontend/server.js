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
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const app = express();
const port = config.server.port;
const feedbackServer = 'http://feedback:3000'
const backendServer = 'http://monolith:3000'

/** ------------------- URL-Routen und -Handler konfigurieren -------------------- */

/** -------------- Reverse Proxy für Backend-Routen --------------- */
app.all("/feedback", function(req, res) {
  console.log('Reverse-Proxy für Feedback-Form');
  proxy.web(req, res, {target: feedbackServer});
});
app.all("/api/save-text", function(req, res) {
  console.log('Reverse-Proxy für API: save-text');
  proxy.web(req, res, {target: backendServer});
});
app.all("/api/get-texts", function(req, res) {
  console.log('Reverse-Proxy für API: get-texts');
  proxy.web(req, res, {target: backendServer});
});

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

