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
const {
  getRoutineById,
  getRoutinesWithoutActivites,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/adapters/routines");
const { createRa } = require("../db/adapters/routine_activites");

const {
  createUser,
  getUser,
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

const seedUser = async () => {
  console.log("..seeding users");
  for (const user of testUsers) {
    await createUser(user);
  }
  console.log("users created!");
};

const seedRoutines = async () => {
  console.log("routine table created");
  ////////////////////////////////////////////
  //getting by id
  console.log("getting routine by id");
  const routineById = await getRoutineById(2);
  console.log("result:", routineById);
  ///////////////////////////////////////////////
  console.log("ROUTINES WITHOUT ACTIVITES......");
  for (const r_without_activties of testRoutines) {
    await getRoutinesWithoutActivites(r_without_activties);
  }
  console.log("success");
  ////////////////////////////////////////////////
  for (const allRoutines of testRoutines) {
    await getAllRoutines(allRoutines);
  }
  console.log("success2");
  ///////////////////////////////////////////////
  for (const public_routines of testRoutines) {
    await getAllPublicRoutines(public_routines);
  }
  console.log("success3");
  //////////////////////////////////////////////
  console.log("getting routine by id");
  const hello = await getAllRoutinesByUser("David");
  console.log("result:", hello);

  //////////////////////////////////////////////
  console.log("getting all public routines by user");
  const hl = await getPublicRoutinesByUser("David");
  console.log("result:", hl);

  //////////////////////////////////////////////
  console.log("getting all public routines by activity");
  const h2 = await getPublicRoutinesByActivity(1);
  console.log("result:", h2);

  /////////////////////////////////////////////
  console.log("creating routine");
  for (const routine of testRoutines) {
    await createRoutine(routine);
  }

  /////////////////////////////////////////////
  console.log("updating a routine");
  const h3 = await updateRoutine(1, {
    is_public: false,
    name: "monday",
    goal: "do chest and triceps",
  });
  console.log("result:", h3);
};

const seedActivites = async () => {
  //seeding activites
  console.log("getting activities by Id");
  for (const gabi of testActivities) {
    await getActivityById(gabi);
  }
  ///////////////////////////////////////
  console.log("making activities");
  for (const activity of testActivities) {
    await createActivites(activity);
  }
  console.log("activities made");
  ///////////////////////////////////////////
  console.log(" getting all activities");
  for (const allActivities of testActivities) {
    await getAllActivities(allActivities);
  }
  console.log("finised getting all activities ");
  ////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////
};

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await seedUser();
    await seedRoutines();
    // await seedActivites();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  } finally {
    client.end();
  }
}

rebuildDB();
