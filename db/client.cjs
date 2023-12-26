// const {Client} = require(`pg`);
// const client = new Client(process.env.DATABASE_URL);

// module.exports = client;


const { Pool } = require('pg');

const pool = new Pool({
  user: 'u754198335_twobitbandit',
  host: 'localhost',
  database: 'u754198335_twobit_db',
  password: 'Dragon88**',
  port: 5432, // Default PostgreSQL port
});