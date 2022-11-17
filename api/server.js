/**
 * Modul M347 - Dienste mit Containern
 *
 * Dies ist der API-Server: Er implementiert eine winzige, simple Demo-API,
 * welche Texte via GET/POST lesen / speichern kann.
 *
 * Dieser Dienst ist der Extrakt aus der ehemals monolithischen Demo-Applikation.
 *
 * API-Routen:
 * - die Route '/api/save-text' nimmt via Form-Post einen Text-Input entgegen, und speichert diesen
 *   demomässig in einer Datenbank-Tabelle.
 * - die Route '/api/get-texts' liefert die zuvor gespeicherten Texte wieder aus.
 *
 * ANMERKUNG:
 * Diese Applikation ist unschön, unsicher und monolithisch BY DESIGN!
 * Ziel ist, diese Applikation im Verlauf des Moduls M347 in einzelne Dienste / Container zu
 * "entwirren".
 *
 * (c) Alexander Schenkel, alexander.schenkel@bztf.ch
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config.js");

const app = express();
const port = config.server.port;

/**
 * Datenbank konfigurieren:
 *
 * Siehe Konfiguration in config/config.js, Abschnitt "Database":
 */
const knex = require("knex")({
  client: config.database.client,
  connection: config.database.connection,
  debug: true,
  pool: {
    afterCreate: function (conn, done) {
      console.info("Connection established");
      if (config.database.initialSql) {
        conn.query(config.database.initialSql, (err) => {
          done(err, done);
        });
      } else {
        console.log("No SQL executed");
        done(null, conn);
      }
    },
  },
});

/** ------------------- URL-Routen und -Handler konfigurieren -------------------- */

// Route: '/api/save-text', mit aktivierten CORS-Headern,
// um Cross-Domain-Requests zu ermöglichen:
app
  .route("/api/save-text")
  .options(cors())
  .post(cors(), bodyParser.json(), async (req, res) => {
    if (req.body.text) {
      try {
        let result = await knex("textinput").insert({
          textinput: req.body.text,
        });
        res.json(result);
      } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
      }
    }
    res.end();
  });

// Route: '/api/get-texts', mit aktivierten CORS-Headern,
// um Cross-Domain-Requests zu ermöglichen:
// Liefert die in der Tabelle 'textinputs' gespeicherten Einträge
app.route("/api/get-texts").get(cors(), async (req, res) => {
  try {
    let result = await knex("textinput").select("*");
    // Wir erstellen hier gleich eine HTML-Tabelle als Response:
    if (result && result.length) {
      let rows = result.map((row) => {
        return `<tr><td>${row.id}</td><td>${row.textinput}</td></tr>`;
      });
      let table = `
      <table>
        <thead><tr><th>ID</th><th>Text</th></tr></thead>
        <tbody>
        ${rows.join("")}
        </tbody>
      </table>
      `;
      res.send(table);
    } else {
      res.send("keine Resultate");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

// ---------------------------------------------------------------
// Starten des Servers:
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// ---------------------------------------------------------------
