module.exports = {
  // ExpressJS server.js configuration:
  server: {
    port: 3000,
  },
  // knex db config:
  // sqlite in-memory:
  /** 
  database: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    initialSql:
      "CREATE TABLE IF NOT EXISTS textinput (id INTEGER PRIMARY KEY AUTOINCREMENT,textinput TEXT)",
  },
  */
  /** Postgres-config: */
  database: {
    client: "pg",
    connection: {
      host: "db",
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB,
    },
    initialSql:
      "CREATE TABLE IF NOT EXISTS textinput (id SERIAL PRIMARY KEY, textinput TEXT);",
  },
};
