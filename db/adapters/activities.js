const { client } = require("../client");

const getActivityById = async (activityId) => {
 try{
  const {
    rows: [gabi],
  } = await client.query(
    `
  SELECT * FROM activities
   WHERE activities.id=${activityId}
  `
  );
 
  return gabi;
 }catch(error){
  next(error);
 }
};

const getAllActivities = async () => {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM activities
      ORDER BY activities.id
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

const createActivities = async ({ name, description }) => {
  const {
    rows: [activity],
  } = await client.query(
    `
        INSERT INTO activities (name, description)
        VALUES ($1, $2)
        RETURNING *
    `,
    [name, description]
  );
  return activity;
};

const updateActivity = async (activity_id, fields) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  console.log(setString);
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id=${activity_id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createActivities,
  getActivityById,
  getAllActivities,
  updateActivity,
};
