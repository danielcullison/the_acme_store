const client = require("./client.js");
const { createUser } = require("./user.js");
const { createProduct } = require("./product.js");
const { createFavorite } = require("./favorite.js");

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS favorite;
            DROP TABLE IF EXISTS product;
            DROP TABLE IF EXISTS "user";
        `);
  } catch (err) {
    console.log("ERROR DROPPING TABLES: ", err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
            CREATE TABLE "user" (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) 
            );

            CREATE TABLE product (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL 
            );

            CREATE TABLE favorite (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            product_id UUID REFERENCES product(id) NOT NULL,
            user_id UUID REFERENCES "user"(id) NOT NULL,
            UNIQUE (product_id, user_id)
            );
        `);
  } catch (err) {
    console.log("ERROR CREATING TABLES: ", err);
  }
};

const init = async () => {
  await client.connect();

  await dropTables();

  await createTables();

  const user1 = await createUser('dcullison17', 'WhoDats2TheDome');

  const user2 = await createUser('maciematherne3', 'Cubs4Life');

  const user3 = await createUser('gerald633', 'test123');

  const product1 = await createProduct('Iphone 14');

  const product2 = await createProduct('Iphone 15');

  const product3 = await createProduct('Iphone 16');

  await createFavorite(product1.id, user1.id);

  await createFavorite(product2.id, user2.id);

  await createFavorite(product3.id, user3.id);
};

init();
