const { Client } = require("pg");
//David
const client = new Client("postgres://localhost:5432/fitness-dev");
//Ferni
// const client = new Client("postgres://unknown:1207@localhost:5432/fitness-dev");

module.exports = {
  client,
};
