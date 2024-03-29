const { client } = require("./client");
//importing
const {
  testUsers,
  testRoutines,
  testActivities,
  testRoutineActivities,
} = require("./seedData");
const {
  createActivities,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("../db/adapters/activities");
const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
} = require("../db/adapters/routines");

const {
  getRoutineActivtyByid,
  addActivityToRoutine,
  updateRoutineActivity,

  getRoutineActivitiesByRoutine,
} = require("../db/adapters/routine_activities");

const {
  createUser,
  getUserById,
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
    throw error;
  }
};

//seeding
const seedUsers = async () => {
  //creating users
  console.log("creating users");
  for (const createdUser of testUsers) {
    await createUser(createdUser);
  }
  console.log("done creating users");
  //getting user by id
  console.log("getting users by id");
  const h2 = await getUserById(2);
  console.log("result:", h2);
  //getting username
  console.log("...getting a userby username");
  const h3 = await getUserByUsername("Ferni");
  console.log("result:", h3);
  console.log("done getting user by username");
};

const seedRoutines = async () => {
  //GETTING ROUTINE BY ID
  console.log("getting routine by id");
  const routineById = await getRoutineById(2);
  console.log("result:", routineById);
  console.log("finished getting routinebyId");

  //ROUTINE WITHOUT ACTIVITiES
  console.log("ROUTINES WITHOUT ACTIVITiES......");
  for (const r_without_activties of testRoutines) {
    await getRoutinesWithoutActivities(r_without_activties);
  }
  console.log("finished routine without activities");

  //ALL ROUTINES
  console.log("getting all routines");
  for (const allRoutines of testRoutines) {
    await getAllRoutines(allRoutines);
  }
  console.log("finished getting all routines");

  //PUNLIC ROUTINES
  console.log("getting public routines");
  for (const public_routines of testRoutines) {
    await getAllPublicRoutines(public_routines);
  }
  console.log("finished getting public routines");

  //GETTING ROUTINE BY ID
  console.log("getting routine by id");
  const hello = await getAllRoutinesByUser("David");
  console.log("result:", hello);

  //PUBLIC ROUTINES BY USER
  console.log("getting all public routines by user");
  const hl = await getPublicRoutinesByUser("David");
  console.log("result:", hl);

  //PUBLIC ROUTINES BY ACTI
  console.log("getting all public routines by activity");
  const h2 = await getPublicRoutinesByActivity(1);
  console.log("result:", h2);

  //creating routine user
  console.log("seeding creating routine");
  for (const rou of testRoutines) {
    await createRoutine(rou);
  }
  console.log("finished screating a routine");
  //UPDATING ROUTINE
  console.log("updating a routine");
  const h3 = await updateRoutine(1, {
    is_public: false,
    name: "monday",
    goal: "do chest and triceps",
  });
  console.log("result:", h3);
};

const seedActivities = async () => {
  //seeding activities
  console.log("getting activities by Id");
  const h1 = getActivityById(1);
  console.log("result:", h1);
  //creating activities
  console.log("making activities");
  for (const activity of testActivities) {
    await createActivities(activity);
  }
  console.log("activities made");

  //getting all the activities
  console.log(" getting all activities");
  for (const allActivities of testActivities) {
    await getAllActivities(allActivities);
  }
  console.log("finised getting all activities ");

  //updating a activity
  console.log("updating an activity");
  const activity = await updateActivity(1, {
    name: "arms",
    description: "dumbell curls, triceps, and forearms",
  });
  console.log("Result:", activity);
};

const seedRoutineActivities = async () => {
  //GETTING ROUTINE BY ID
  console.log("getting routine by id");
  const h1 = await getRoutineActivtyByid(1);
  console.log("Result:", h1);

  //ADDING ACTIVITY ROUTINE
  console.log("adding to activity routine");
  for (const AATR of testRoutineActivities) {
    await addActivityToRoutine(AATR);
  }
  console.log("finsihed adding to activity routine");

  //UPDATING ROUTINE ACTIVITY
  console.log("updating routine activities");
  const h2 = await updateRoutineActivity(1, {
    duration: 10,
    count: 30,
  });
  console.log("Result:", h2);

  //ROUTINE ACTIVITiES BY ROUTINE
  console.log("getting routine activities by routine");
  const h3 = await getRoutineActivitiesByRoutine(1);
  console.log("result:", h3);
};

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await seedUsers();
    await seedRoutines();
    await seedActivities();
    await seedRoutineActivities();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  } finally {
    client.end();
  }
}

rebuildDB();
