import pg from 'pg';

async function setup() {
  await pgClient.connect();
  // await pgClient.query("SET search_path TO 'pg';");
}

const pgClient = new pg.Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    mode: 'require',
    rejectUnauthorized: false,
  },
  // max: 10,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

setup();

export default pgClient;
