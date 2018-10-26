require('dotenv').config()
const env = process.env.NODE_ENV

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3000
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   database: process.env.DEV_DB_DATABASE || 'database',
   username: process.env.DEV_DB_USERNAME || 'username',
	 password: process.env.DEV_DB_PASSWORD || 'password'
 }
};
const test = {
	app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },
  db: {
    host: parseInt(process.env.DEV_DB_HOST) || 'localhost',
    database: parseInt(process.env.DEV_DB_DATABASE) || 'database',
    username: parseInt(process.env.DEV_DB_USERNAME) || 'username',
 	 password: parseInt(process.env.DEV_DB_PASSWORD) || 'password'
  }
 };

const config = {
 dev,
 test
};

module.exports = config;
