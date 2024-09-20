const client = require("./client.js");

const createRestaurant = async (restaurantName) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO restaurant (name)
            VALUES ('${restaurantName}')
            RETURNING *;
        `);
    const restaurant = rows[0];
    return restaurant;
  } catch (err) {
    console.log("ERROR CREATING RESTAURANT: ", err);
  }
};

const fetchRestaurants = async () => {
  try {
   const { rows } =  await client.query(`
      SELECT * FROM restaurant;
    `);
    return rows;
  } catch (err) {
    console.log('ERROR FETCHING RESTAURANTS: ', err);
  }
};

module.exports = {
  createRestaurant: createRestaurant,
  fetchRestaurants: fetchRestaurants,
};
