module.exports = {
  // ExpressJS server.js configuration:
  server: {
    port: 3001,
  },

  // Mail-Config: nur benötigt, wenn eigener Mailer (nicht ethereal):
  mailer: {
    smtp_host: "m347-mail",
    smtp_port: 25,
    secure: false,
    smtp_user: null,
    smtp_password: null,
  },

  feedbackConfig: {
    from_address: "Feedback <feedback@example.com>",
    to_address: "M347 <m347@example.com>",
  }
};
