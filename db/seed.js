const { client } = require("./client");
const {
  testUsers,
  testRoutines,
  testActivities,
  testRoutineActivities,
} = require("./seedData");
const {
  createActivites,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("../db/adapters/activites");
const { createRoutine } = require("../db/adapters/routines");
const { createRa } = require("../db/adapters/routine_activites");

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
  DROP TABLE IF EXISTS routine_activities;
  DROP TABLE IF EXISTS routines;
  DROP TABLE IF EXISTS activities;
  DROP TABLE IF EXISTS users;
  `);
};

//Create tables
const createTables = async () => {
  try {
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
  CREATE TABLE routines(
    id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users(id),
    is_public BOOLEAN DEFAULT false,
    name VARCHAR(255) UNIQUE NOT NULL,
    goal TEXT NOT NULL
  );
  `);

    //ACTIVITIES TABLE
    await client.query(`
  CREATE TABLE activities(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL,
	description TEXT NOT NULL
);

`);
    //Routine activities
    await client.query(`
  CREATE TABLE routine_activities(
	id SERIAL PRIMARY KEY,
	routine_id INTEGER REFERENCES routines(id),
	activity_id INTEGER REFERENCES activities(id),
	duration INTEGER ,
	count INTEGER,
  UNIQUE (routine_id, activity_id)
);

`);

    console.log("tables created!");
  } catch (error) {
    console.log("Error building tables!", error);
  }
};

const seedDB = async () => {
  console.log("..seeding users");
  for (const user of testUsers) {
    await createUser(user);
  }
  console.log("users created!");

  // seeding Routines
  for (const routine of testRoutines) {
    await createRoutine(routine);
  }
  console.log("routine created");

  //seeding activity
  console.log("making activities");
  for (const activity of testActivities) {
    await createActivites(activity);
  }
  console.log("activities made");

  // // seeding routines_activities
  console.log("making routine activities");
  for (const rActivities of testRoutineActivities) {
    await createRa(rActivities);
  }
  console.log("routine_activities created");

  console.log("getting activities by Id");
  for (const gabi of testActivities) {
    await getActivityById(gabi);
  }

  console.log(" getting all activities");
  for (const allActivities of testActivities) {
    await getAllActivities(allActivities);
  }
  console.log("finised updating activities ");




  for (const activity of testActivities) {
    await updateActivity(activity);
  }



};

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await seedDB();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  } finally {
    client.end();
  }
}

rebuildDB();
