const { Client } = require("pg");
//David = make sure to comment out ferni const client = new client when coding
const client = new Client("postgres://localhost:5432/fitness-dev");
//Ferni = make sure to comment out davids const client when coding
// const client = new Client("postgres://unknown:1207@localhost:5432/fitness-dev");

module.exports = {
  client,
};
