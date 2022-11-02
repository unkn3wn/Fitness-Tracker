const { client } = require("../client");
//getting routine by id
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

module.exports = { createRa };
