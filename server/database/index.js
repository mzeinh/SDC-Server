const { Pool, Client } = require('pg');

const connectionString = process.env.DB_LINK;

const pool = new Pool({
  connectionString: 'pg://root:1234567@127.0.0.1:5432/sdc',
});

module.exports = {
  pool,
  query: (text, params, callback) => pool.query(text, params, callback),
};
