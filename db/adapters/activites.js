const { client } = require("../client");

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

module.exports = { createActivites };
