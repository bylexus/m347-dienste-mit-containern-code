/**
 * Modul M347 - Dienste mit Containern
 *
 * Lektion 006 - Feedback-Dienst separat
 * -------------------------------------------------------------------------
 *
 * Diese Version des server.js beinhaltet nur noch die Code-Teile des ursprünglichen
 * Monolithen, welche sich um den Formular-Feedback-Teil (Post, Mailversand) kümmert.
 *
 * (c) Alexander Schenkel, alexander.schenkel@bztf.ch
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const config = require("./config.js");

const app = express();
const port = config.server.port;

// ---------------------------------------------------------------
// Route-Handler für /feedback (Form-backend)
// ---------------------------------------------------------------
// Wir registrieren einen Route-Handler für die
// Route '/feedback': Unser Formular schickt seine Daten hierhin
// mit aktivierten CORS-Headern, um Cross-Domain-Requests zu ermöglichen:
app
  .route("/feedback")
  .options(cors())
  .post(
    cors(),
    // die body-parser-Middleware erlaubt das Auslesen von
    // Formulardaten, hier in der urlencoded-Form:
    bodyParser.urlencoded({ extended: false }),
    async (req, res) => {
      // Wir verarbeiten die Form-Daten:
      let name = req.body.name;
      let vorname = req.body.vorname;
      console.log(`name: ${name}`);
      console.log(`vorname: ${vorname}`);

      // TODO: Hier wollen wir die Formulardaten auch in der Datenbank speichern!

      // Hier lösen wir das Feedback-Email aus:
      try {
        let previewUrl = await sendFeedbackEmail(name, vorname);
        // ... und rendern eine Antwortseite:
        res.send(`<h1>Vielen Dank!</h1>
                <p>Ihr Feedback ist angekommen.</p>
                <p><a href="${previewUrl}">Vorschau-URL</a>`);
      } catch (err) {
        console.error(err);
        res.status(500).send(String(err));
      }
    }
  );

// Konfigurieren des Email-Dienstes für den Formular-Daten -Versand:
let emailTransport = null;
// Email-Setup, hier mit dem Fake-Dienst ethereal.email:
setupEmail().then((transport) => {
  emailTransport = transport;
});

/**
 * Hilfsfunktion: konfiguriert einen Email-Transport für nodemailer,
 * hier mit dem Test-Maildienst ethereal.email. Liefert den transport
 * mittels einer Promise.
 */
function setupEmail() {
  return new Promise((resolve, reject) => {
    // Setting up fake email using ethereal.email:
    // Generate SMTP service account from ethereal.email
    /*
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained");

      // Create a SMTP transporter object
      let emailTransport = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      resolve(emailTransport);
    });
    */

    // Create a SMTP transporter object
    let emailTransport = nodemailer.createTransport({
      host: config.mailer.smtp_host,
      port: config.mailer.smtp_port,
      secure: config.mailer.secure,
      // auth: {
      //   user: config.mailer.smtp_user,
      //   pass: config.mailer.smtp_password,
      // },
    });

    resolve(emailTransport);
  });
}

/**
 * Sendet die Feedback-Daten per Mail an den vorkonfigurierten Mail-Transport
 *
 * Als Rückgabewert wird in einer Promise die Preview-URL des Mailers zurückgegeben, falls vorhanden.
 */
function sendFeedbackEmail(name, vorname) {
  return new Promise((resolve, reject) => {
    // Message object
    let message = {
      from: config.feedbackConfig.from_address,
      to: config.feedbackConfig.to_address,
      subject: "Feedback von M347",
      text: `Feedback von ${name}, ${vorname} erhalten.`,
      html: `<p>Feedback von <b>${name}, ${vorname}</b> erhalten.</p>`,
    };

    emailTransport.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return reject(err);
      } else {
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        let url = nodemailer.getTestMessageUrl(info);
        console.log("Preview URL: %s", url);
        resolve(url);
      }
    });
  });
}
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// App-Start
// ---------------------------------------------------------------
app.listen(port, () => {
  console.log(`Feedback Server listening on port ${port}`);
});
// ---------------------------------------------------------------
