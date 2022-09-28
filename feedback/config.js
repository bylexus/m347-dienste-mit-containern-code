module.exports = {
  paths: {
    public_dir: "site",
    src_dir: "src",
    views_dir: "src/views",
    vendor_dir: "src/resources/vendor",
    resources_dir: "src/resources",
  },
  // ExpressJS server.js configuration:
  server: {
    port: 3000,
    // managementPort: 3001,
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
  njk: {
    // Add custom variables to be inserted into the HTML templates
    templateVars: {
      testing: "Test Variable.",
      now: new Date(),
    },
  },
  sass: {
    // Determines the style of the final CSS files
    // Values: ['nested', 'expanded', 'compact', 'compressed']
    outputStyle: "nested",
  },
  js: {
    // Determines if the final JS files would be compressed
    // Values: [true, false]
    doCompress: false,
    // Determines if the .js source file would be included after compression
    // doCompress must be true
    // Values: [true, false]
    doKeepSource: false,
  },
};
