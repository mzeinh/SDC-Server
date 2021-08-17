const { Pool, Client } = require('pg');

const connectionAuth = process.env.HOST;

const pool = new Pool({
  connectionString: connectionAuth,
});

module.exports = {
  pool,
  query: (text, params, callback) => pool.query(text, params, callback),
};
