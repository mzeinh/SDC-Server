const { Client } = require('pg');

const connectionString = process.env.DB_LINK;

const db = new Client('pg://root:1234567@127.0.0.1:5432/sdc');

module.exports = {
  db,
  query: (text, params, callback) => db.query(text, params, callback),
};
