const client = require("./client.js");

const createFavorite = async (productId, userId) => {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO favorite (product_id, user_id)
      VALUES ($1, $2)
      RETURNING *;
  `,
      [productId, userId]
    );
    return rows[0];
  } catch (err) {
    console.log("ERROR CREATING FAVORITE: ", err);
  }
};

const fetchFavorites = async (userId) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM favorite WHERE user_id = $1;
    `,
      [userId]
    );
    return rows;
  } catch (err) {
    console.log("ERROR FETCHING FAVORITES: ", err);
  }
};

const destroyFavorite = async (favoriteId) => {
  try {
    await client.query(
      `
        DELETE FROM favorite WHERE id = $1
      `,
      [favoriteId]
    );
  } catch (err) {
    console.log("ERROR DELETING FAVORITE: ", err);
  }
};

module.exports = {
  createFavorite: createFavorite,
  fetchFavorites: fetchFavorites,
  destroyFavorite: destroyFavorite,
};
