const client = require("./client.js");
const { createCustomer } = require("./customer.js");
const { createRestaurant } = require("./restaurant.js");
const { createReservation } = require("./reservation.js");

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS reservation;
            DROP TABLE IF EXISTS restaurant;
            DROP TABLE IF EXISTS customer;
        `);
  } catch (err) {
    console.log("ERROR DROPPING TABLES: ", err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
            CREATE TABLE customer (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL 
            );

            CREATE TABLE restaurant (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL 
            );

            CREATE TABLE reservation (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES restaurant(id) NOT NULL,
            customer_id UUID REFERENCES customer(id) NOT NULL
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

  const daniel = await createCustomer('Daniel');

  const macie = await createCustomer('Macie');

  const joe = await createCustomer('Joe');

  const drew = await createCustomer('Drew');

  const outback = await createRestaurant('Outback');

  const nobu = await createRestaurant('Nobu');

  const sake = await createRestaurant('Sake');

  const reginellis = await createRestaurant('Reginellis');

  await createReservation('Oct 13, 2024', 3, outback.id, daniel.id);

  await createReservation('Dec 16, 2024', 5, nobu.id, macie.id);

  await createReservation('Dec 9, 1999', 2, sake.id, joe.id);

  await createReservation('Dec 23, 2024', 7, reginellis.id, drew.id);
};

init();
