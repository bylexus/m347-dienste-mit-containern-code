module.exports = {
  // ExpressJS server.js configuration:
  server: {
    port: 3000,
    // managementPort: 3001,
  },

  // Mail-Config: nur benötigt, wenn eigener Mailer (nicht ethereal):
  mailer: {
    smtp_host: "mailhog",
    smtp_port: 1025,
    secure: false,
    smtp_user: null,
    smtp_password: null,
  },

  // knex db config:
  // sqlite in-memory:
  database: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    initialSql:
      "CREATE TABLE IF NOT EXISTS textinput (id INTEGER PRIMARY KEY AUTOINCREMENT,textinput TEXT)",
  },
  /** Postgres-config:
  database: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "your_database_user",
      password: "your_database_password",
      database: "myapp_test",
    },
    initialSql:
      "CREATE TABLE IF NOT EXISTS textinput (id SERIAL PRIMARY KEY, textinput TEXT)",
  },
  */
};
