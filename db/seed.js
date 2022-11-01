const { client } = "require";

const {
  createUser,
  getUsers,
  getUserByID,
  getUserByUsername,
} = require("../db/adapters/users");

//DROPPING TABLES
const dropTables = async () => {
  console.log("WE ARE DROPPING TABLES");
  await client.query(`
  DROP TABLES IF EXISTS users;
  DROP TABLES IF EXISTS Routines;
  DROP TABLES IF EXISTS Activities;
  DROP TABLES IF EXISTS RoutineActivities;
  `);
};

//Create tables
const createTables = async () => {
  console.log("creating tables");
  //USERS TABLE
  await client.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
  );
  `);

  //ROUTINES TABLE
  await client.query(`
  CREATE TABLE Routines(
    id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users(id),
    is_public BOOLEAN DEFAULT false,
    name VARCHAR(255) UNIQUE NOT NULL,
    goal TEXT NOT NULL
  );
  `);

  //ACTIVITIES TABLE
  await client.query(`
  CREATE TABLE Activities(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL,
	description TEXT NOT NULL
);

`);
  //Routine activities
  await client.query(`
  CREATE TABLE RoutineActivities(
	id SERIAL PRIMARY KEY,
	routine_id INTEGER REFERENCES routines(id) UNIQUE,
	activity_id INTEGER REFERENCES activities(id) UNIQUE,
	duration INTEGER ,
	count INTEGER
);

`);
};

async function testFitnessDB() {
  try {
    client.connect();
    const result = await client.query(`SELECT * FROM users;`);
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

testFitnessDB();
