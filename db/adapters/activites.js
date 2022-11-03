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

const updateActivity = async ({ name, description }) => {
  const setString = Object.keys(description)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [update_activity],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE name=${name}
      RETURNING *;
    `,
      Object.values(description)
    );

    return update_activity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createActivites,
  getActivityById,
  getAllActivities,
  updateActivity,
};
