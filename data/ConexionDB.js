const {Client} = require('pg');

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'prueba1',
  password: '41060109',
  port: 5432,
};

const client = new Client(connectionData);

module.exports = client;
