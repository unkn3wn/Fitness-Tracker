const { client } = require("../client");
//make sure to hash the password before storing it to the database
const createUser = async ({ username, password }) => {
  try {
    const {
      rows: [createdUser],
    } = await client.query(
      `
          INSERT INTO users (username, password)
          VALUES ($1, $2)
          RETURNING *
      `,
      [username, password]
    );
    return createdUser;
  } catch (error) {
    throw error;
  }
};

//this should be able to verify the password against the hashed password
const getUser = async (username, password) => {
  try {
    const {
      rows: [oneuser],
    } = await client.query(`
          SELECT * FROM users
      `);
    return oneuser;
  } catch {
    throw error;
  }
};

const getUserById = async (certainId) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
            SELECT id, username
            FROM users
            WHERE id=${certainId}
          `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE username=$1;
        `,
      [username]
    );

    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  client,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
