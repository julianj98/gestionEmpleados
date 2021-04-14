const { Client } = require("pg");
const connectionData = {
  user: "postgres",
  host: "localhost",
  database: "Empleados",
  password: "1234",
  port: 5432,
};
const client = new Client(connectionData);

module.exports = client;
