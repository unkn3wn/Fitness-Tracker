const client = require("../client");
//make sure to hash the password before storing it to the database
const createUser = async (username, password) => {
  const { name } = username;
  const { pword } = password;
  const {
    rows: [createdUser],
  } = await client.query(
    `
        INSERT INTO users (username)
        INSERT INTO users (password)
        VALUES ($1)
        RETURNING *
    `,
    [name, pword]
  );
  return createdUser;
};
//this should be able to verify the password against the hashed password
const getUsers = async () => {
  const { rows } = await client.query(`
          SELECT * FROM users
      `);
  return rows;
};

const getUserByID = async (id) => {
  try {
    const {
      rows: [users],
    } = await client.query(`
          SELECT id FROM users
          WHERE id =${userId};
        `);
    if (!users) {
      return null;
    } else {
      user.posts = await getPostsByUser(id);
    }
    console.log(user, "get user by id");
    return users;
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

moduke.exports = {
  client,
  createUser,
  getUsers,
  getUserByID,
  getUserByUsername,
};
