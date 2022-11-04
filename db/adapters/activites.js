const { client } = require("../client");

const getActivityById = async ({ id }) => {
  const { rows: gabi } = await client.query(
    `
  SELECT * FROM activities
  WHERE id=$1
  `,
    [id]
  );
  return gabi;
};

const getAllActivities = async () => {
  try {
    const { rows: allActivites } = await client.query(
      `
      SELECT * FROM activities`
    );
    return allActivites;
  } catch (error) {
    throw error;
  }
};

const createActivites = async ({ name, description }) => {
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
{
  name: "a";
}
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
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET ${setString}
      WHERE id=${activity_id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return activity;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createActivites,
  getActivityById,
  getAllActivities,
  updateActivity,
};
