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
async function updateRoutineActivity(routine_id, activity_id, count, duration) {
  try {
    const {
      rows: [updatedRoutAct],
    } = await client.query(
      `
      UPDATE routine_activities
      WHERE routine_activities.routine_id = ${routine_id} AND routine_activities.activity_id = ${activity_id}
      RETURNING count, duration  
          `,
      [routine_id, activity_id, count, duration]
    );
    return updatedRoutAct;
  } catch (error) {
    throw error;
  }
}
//destroying routine activities remove routine_activty from DB
const destroyRoutineActivity = async (routine_id, activity_id) => {
  try {
    const { rows } = await client.query(
      `
    DELETE FROM routine_activities
    WHERE routine_activities.routine_id = ${routine_id} AND routine_activities.activity_id = ${activity_id}
      RETURNING *;
   `
    );
    return { rows };
  } catch (error) {
    throw error;
  }
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
  getRoutineActivtyByid,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
