const { client } = require("../client");
//routine by ID
const getRoutineById = async () => {
  //grab routine which matches id of matching activities
  try {
    const {
      rows: [routine],
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
    CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
      ON routines.id = ra."routineId"
    LEFT JOIN activities 
      ON ra."activityId" = activities.id
    JOIN users
      ON routines."creatorId" = users.id	
    GROUP BY routines.id, ra."routineId", users.username
    `);
    return routine_id;
  } catch (error) {
    console.error("Failed in getting routines by Id");
  }
};

//select and return an array of all routines
const getRoutinesWithoutActivites = async () => {
  try {
    const {
      rows: [r_without_activties],
    } = await client.query(`
    SELECT * FROM routines

  `);
    return r_without_activties;
  } catch (error) {
    console.error("ERROR TRYING TO GET ROUTINES WITHOUT ACTIVITES");
  }
};
//select and return an array of public routiens, include their activites(use join)
const getAllRoutines = async () => {
  try {
    const { rows: allRoutines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
    CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
      ON routines.id = ra."routineId"
    LEFT JOIN activities 
      ON ra."activityId" = activities.id
    JOIN users
      ON routines."creatorId" = users.id	
     
    GROUP BY routines.id, ra."routineId", users.username
    `);
    return allRoutines;
  } catch (error) {
    console.error("GETTING ALL ROUTINES");
  }
};
//select and return an array of all routines,include their activites (use a join)
const getAllPublicRoutines = async () => {
  try {
    const {
      rows: [public_routines],
    } = await client.query(`
  SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
	GROUP BY routines.id, ra."routineId", users.username
  `);
    return public_routines;
  } catch (error) {
    console.error("ERROR IN FUNCTION GET PUBLIC_ROUTINES");
  }
};

//select and return an array opf public routines made by user, inlcude their activites(use a join)
const getAllRoutinesByUser = async () => {
  try {
    const {
      rows: [routines_user],
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
	GROUP BY routines.id, ra."routineId", users.username
    `);
    return routines_user;
  } catch (error) {
    console.error("ERROR IN ALL ROUTINES BY USER");
  }
};

const getPublicRoutinesByUser = async () => {
  try {
    const {
      rows: [PRBU],
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
    WHERE routines.is_public = true AND users.username=$1
	GROUP BY routines.id, ra."routineId", users.username
    `);
    return PRBU;
  } catch (error) {
    console.error("ERORR IN GET_PUBLIC_ROUTINES_BY-USER");
  }
};
//select and retunr an array of public routines whihc hace a specific activy_iud intheir routine_activites join, inlucde their activites(use join)
const getPublicRoutinesByActivity = async () => {
  try {
    const {
      rows: [prba],
    } = await client.query(`
    SELECT routines.*, users.username AS "creatorName",
	CASE WHEN ra."routineId" is NULL THEN'[]'::json
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
		ON routines.id = ra."routineId"
	LEFT JOIN activities 
		ON ra."activityId" = activities.id
	JOIN users
		ON routines."creatorId" = users.id	
	GROUP BY routines.id, ra."routineId", users.username
    `);
    return prba;
  } catch (error) {
    console.error("ERROR IN PUBLIC_ROUTINES_BY_ACTIVTY");
  }
};
//getting routine by id//should be NUmber 8
const createRoutine = async ({ creator_id, is_public, name, goal }) => {
  const {
    rows: [routine],
  } = await client.query(
    `
        INSERT INTO routines (creator_id, is_public, name, goal)
        VALUES ($1, $2, $3,$4)
        RETURNING *
    `,
    [creator_id, is_public, name, goal]
  );
  return routine;
};
//updating a routine
async function updateRoutine(is_public, name, goal = {}) {
  // build the set string
  const setString = Object.keys(is_public, name, goal)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [u_post],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE is_public = ${is_public}, name = ${name}, goal = ${goal}
         
        RETURNING *;
      `,
      Object.values(is_public, name, goal)
    );

    return u_post;
  } catch (error) {
    throw error;
  }
}
//deleting routines
const destroyRoutine = async () => {
  const {
    rows: [dR],
  } = await client.query(
    `
    DELETE FROM routines WHERE routineId = ${id}
   `
  );
  return dR;
};

module.exports = {
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
};
