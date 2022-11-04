const { client } = require("../client");

//getting routine by id pass routine id
const getRoutineActivtyByid = async (id) => {
  try {
    const {
      rows: [GRABI],
    } = await client.query(`
      SELECT * FROM routine_activities 
      WHERE routine_activities.id = ${id}
    
    `);
    return GRABI;
  } catch (error) {
    throw error;
  }
};
//adding to the routine
const addActivityToRoutine = async ({
  routine_id,
  activity_id,
  duration,
  count,
}) => {
  try {
    const {
      rows: [AATR],
    } = await client.query(
      `
          INSERT INTO routine_activities (routine_id, activity_id, duration, count )
          VALUES ($1, $2, $3,$4)
          RETURNING *
      `,
      [routine_id, activity_id, duration, count]
    );
    return AATR;
  } catch (error) {
    throw error;
  }
};
//now we want to update our routines
const updateRoutineActiity = async (ura, fields) => {
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
    UPDATE routine_activities
    SET ${setString}
    WHERE routine_activities.id = ${ura}
    RETURNING *;
  `,
      Object.values(fields)
    );
    return routine;
  } catch (error) {
    throw error;
  }
};
//destroying routine activities remove routine_activty from DB
const destroyRoutineActivity = async (id) => {
  try {
    const {
      rows: [DRA],
    } = await client.query(`
    DELETE FROM routine_activities 
      WHERE routine_activities.id = ${id}
        RETURNING *;
  `);
    return DRA;
  } catch (error) {
    throw error;
  }
};
const createRa = async ({ routine_id, activity_id, duration, count }) => {
  const {
    rows: [rActivities],
  } = await client.query(
    `
        INSERT INTO routine_activities (routine_id, activity_id, duration, count )
        VALUES ($1, $2, $3,$4)
        RETURNING *
    `,
    [routine_id, activity_id, duration, count]
  );
  return rActivities;
};

const getRoutineActivitiesByRoutine = async (routineId) => {
  try {
    const {
      rows: [GRABR],
    } = await client.query(`
      SELECT * FROM routine_activities
        WHERE routine_id = ${routineId}
    
    `);
    return GRABR;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createRa,
  getRoutineActivtyByid,
  addActivityToRoutine,
  updateRoutineActiity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
