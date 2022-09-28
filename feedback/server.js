/**
 * Modul M347 - Dienste mit Containern
 *
 * Dies ist der Feedback-Dienst, welcher die Formular-Feedback-Route (/feedback)
 * zur Verfügung stellt:
 *
 * - /feedback nimmt einen Form-Post entgegen
 * - und sendet diese Daten per Mail an eine konfigurierte Mailbox
 * - in dieser Inkarnation wird ethereal.email als Dummy-Mailserver verwendet
 *
 * Dies stellt die Extraktion des /feedback-Dienstes in einen eigenen Container dar.
 * Die Schüler sollen aus dem Monolithen den notwendigen Code extrahieren,
 * Endziel ist in etwa dieser Dienst.
 *
 * (c) Alexander Schenkel, alexander.schenkel@bztf.ch
 */
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const config = require("./config.js");

const app = express();
const port = config.server.port;

/** ------------------- URL-Routen und -Handler konfigurieren -------------------- */

// Wir registrieren einen Route-Handler für die
// Route '/feedback': Unser Formular schickt seine Daten hierhin
app.post(
  "/feedback",
  // die body-parser-Middleware erlaubt das Auslesen von
  // Formulardaten, hier in der urlencoded-Form:
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    // Wir verarbeiten die Form-Daten:
    let name = req.body.name;
    let vorname = req.body.vorname;
    console.log(`name: ${name}`);
    console.log(`vorname: ${vorname}`);

    // Hier lösen wir das Feedback-Email aus:
    let response = sendFeedbackEmail(name, vorname);

    // ... und leiten den Browser zu einer Dankes-Seite um:
    res.redirect("/thankyou.html");
  }
);

// ---------------------------------------------------------------
// Konfigurieren unseres Email-Demos, danach
// Starten des Servers:
let emailTransport = null;
console.log("Set up email transport, stand by ...");
// Email-Setup, hier mit dem Fake-Dienst ethereal.email:
setupEmail().then((transport) => {
  emailTransport = transport;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
// ---------------------------------------------------------------

// ---------------------------------------------------------------
/**
 * Hilfsfunktion: konfiguriert einen Email-Transport für nodemailer,
 * hier mit dem Test-Maildienst ethereal.email. Liefert den transport
 * mittels einer Promise.
 */
function setupEmail() {
  return new Promise((resolve, reject) => {
    // Setting up fake email using ethereal.email:
    // Generate SMTP service account from ethereal.email
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
  });
}

/**
 * Sendet die Feedback-Daten per Mail an den vorkonfigurierten Mail-Transport
 * 
 * @return string URL zum Demo-Mail
 */
function sendFeedbackEmail(name, vorname) {
  // Message object
  let message = {
    from: "Sender Name <sender@example.com>",
    to: "Recipient <recipient@example.com>",
    subject: "Feedback-Formular",
    text: `Feedback von ${name}, ${vorname} erhalten.`,
    html: `<p>Feedback von <b>${name}, ${vorname}</b> erhalten.</p>`,
  };

  emailTransport.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    let url = nodemailer.getTestMessageUrl(info);
    console.log("Preview URL: %s", url);
    return url;
  });
}
