const client = require("./client.js");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const { rows } = await client.query(
      `
      INSERT INTO "user" (username, password)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [username, hashedPassword]
    );
    const user = rows[0];
    return user;
  } catch (err) {
    console.log("ERROR CREATING USER: ", err);
  }
};

const fetchUsers = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM "user";
    `);
    return rows;
  } catch (err) {
    console.log("ERROR FETCHING USERS: ", err);
  }
};

module.exports = {
  createUser: createUser,
  fetchUsers: fetchUsers,
};
