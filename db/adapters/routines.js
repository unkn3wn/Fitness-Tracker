const { client } = require("../client");
//routine by ID
const getRoutineById = async (id) => {
  try {
    const {rows: [routine],} = await client.query(`
      SELECT routines.*,  users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
          )
        ) END AS activities
                FROM routines
                LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routine_id"
          LEFT JOIN activities 
        ON ra."activity_id" = activities.id
          JOIN users
            ON routines."creator_id" = users.id	
          WHERE routines.id=${id}
          GROUP BY routines.id, ra."routine_id", users.username
              `);
    if (!routine) {
      return null;
    }
    return routine;
  } catch (error) {
    throw error;
  }
};

//select and return an array of all routines
const getRoutinesWithoutActivities = async () => {
  try {
    const {
      rows: [r_without_activties],
    } = await client.query(`
    SELECT * FROM routines

  `);
    return r_without_activties;
  } catch (error) {
    throw error;
  }
};
//select and return an array of public routiens, include their activites(use join)
const getAllRoutines = async () => {
  try {
    const { rows: allRoutines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
          CASE WHEN ra."routine_id" is NULL THEN'[]'::json
          ELSE
          JSON_AGG(
              JSON_BUILD_OBJECT(
              'id', activities.id,
              'name', activities.name,
              'description', activities.description,
              'count', ra.count,
              'duration', ra.duration
              )
          ) END AS activities
          FROM routines	
          LEFT JOIN routine_activities AS ra
              ON routines.id = ra."routine_id"
          LEFT JOIN activities 
              ON ra."activity_id" = activities.id
          JOIN users
              ON routines."creator_id" = users.id	
              
          GROUP BY routines.id, ra."routine_id", users.username
    `);
    return allRoutines;
  } catch (error) {
    throw error;
  }
};
//select and return an array of all routines,include their activites (use a join)
const getAllPublicRoutines = async () => {
  try {
    const { rows: public_routines } = await client.query(`
    SELECT routines.*,  users.username AS "creatorName",      
    CASE WHEN ra."routine_id" is NULL THEN'[]'::json
    ELSE
    JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
         )
        ) END AS activities
                FROM routines
                LEFT JOIN routine_activities AS ra
         ON routines.id = ra."routine_id"
        LEFT JOIN activities 
        ON ra."activity_id" = activities.id
        JOIN users
         ON routines."creator_id" = users.id	
        WHERE routines.is_public = true
        GROUP BY routines.id, ra."routine_id", users.username
  `);
    return public_routines;
  } catch (error) {
    throw error;
  }
};
//select and return an array opf public routines made by user, inlcude their activites(use a join)
const getAllRoutinesByUser = async (username) => {
  try {
    const { rows: routines_user } = await client.query(`
    SELECT routines.*,  users.username AS "creatorName",      
    CASE WHEN ra."routine_id" is NULL THEN'[]'::json
    ELSE
    JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
         )
        ) END AS activities
                FROM routines
                LEFT JOIN routine_activities AS ra
         ON routines.id = ra."routine_id"
        LEFT JOIN activities 
        ON ra."activity_id" = activities.id
        JOIN users
         ON routines."creator_id" = users.id	
        WHERE users.username='${username}'
        GROUP BY routines.id, ra."routine_id", users.username
    `);
    return routines_user;
  } catch (error) {
    throw error;
  }
};

const getPublicRoutinesByUser = async (username) => {
  try {
    const { rows: PRBU } = await client.query(`
    SELECT routines.*,  users.username AS "creatorName",
    CASE WHEN ra."routine_id" is NULL THEN'[]'::json
    ELSE
    JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
         )
        ) END AS activities
                FROM routines
                LEFT JOIN routine_activities AS ra
         ON routines.id = ra."routine_id"
        LEFT JOIN activities 
          ON ra."activity_id" = activities.id
        JOIN users
          ON routines."creator_id" = users.id	
        WHERE users.username='${username}' AND routines.is_public = true
          GROUP BY routines.id, ra."routine_id", users.username
    `);
    return PRBU;
  } catch (error) {
    throw error;
  }
};
//select and retunr an array of public routines whihc hace a specific activy_iud intheir routine_activites join, inlucde their activites(use join)
const getPublicRoutinesByActivity = async (id) => {
  try {
    const { rows } = await client.query(`
    SELECT routines.*,  users.username AS "creatorName",                    
    CASE WHEN ra."routine_id" is NULL THEN'[]'::json
    ELSE
    JSON_AGG(
      JSON_BUILD_OBJECT(
      'id', activities.id,
      'name', activities.name,
      'description', activities.description,
      'count', ra.count,
      'duration', ra.duration
       )
      ) END AS activities
     FROM routines         
          LEFT JOIN routine_activities AS ra
    ON routines.id = ra."routine_id"
    LEFT JOIN activities 
    ON ra."activity_id" = activities.id
    JOIN users
    ON routines."creator_id" = users.id	
    WHERE activities.id = ${id}
    AND routines.is_public = true
   GROUP BY routines.id, ra."routine_id", users.username
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};
//getting routine by id//should be NUmber 8
const createRoutine = async ({ creator_id, is_public, name, goal }) => {
  try {
    const {
      rows: [rou],
    } = await client.query(
      `
          INSERT INTO routines (creator_id, is_public, name, goal)
          VALUES ($1, $2, $3,$4)
          RETURNING *
      `,
      [creator_id, is_public, name, goal]
    );
    return rou;
  } catch (error) {
    throw error;
  }
};

//updating routines
const updateRoutine = async (routines_id, fields) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"= $${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET ${setString}
      WHERE id=${routines_id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return routine;
  } catch (error) {
    console.error("ERROR IN UPDATING ROUTINE");
  }
};

//deleting routines
const destroyRoutine = async (routine_id) => {
  try {
    const { rows } = await client.query(
      `
    DELETE FROM routines 
      WHERE routines.Id = ${routine_id}
      RETURNING *;
   `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
