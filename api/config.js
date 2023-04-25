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
      user: "m347",
      password: "m347",
      database: "m347",
    },
    initialSql:
      "CREATE TABLE IF NOT EXISTS textinput (id SERIAL PRIMARY KEY, textinput TEXT);",
  },
};
