const { Client } = require("pg");
const client = new Client(
  "postgres://localhost:5432/the_acme_store"
);

module.exports = client;
