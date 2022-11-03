const { client } = require("../client");
//routine by ID
const getRoutineById = async () => {
  try {
    const {
      rows: [routine],
    } = await client.query(`
    
    SELECT * FROM routines
  
    `);
    return routine;
  } catch (error) {
    console.error("Failed in getting routines by Id");
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



module.exports = { createRoutine };
