const client = require("./client.js");

const createCustomer = async (customerName) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO customer (name)
            VALUES ('${customerName}')
            RETURNING *;
        `);
    const customer = rows[0];
    return customer;
  } catch (err) {
    console.log("ERROR CREATING CUSTOMER: ", err);
  }
};

const fetchCustomers = async () => {
  try {
   const { rows } =  await client.query(`
      SELECT * FROM customer;
    `);
    return rows;
  } catch (err) {
    console.log('ERROR FETCHING CUSTOMERS: ', err);
  }
};

module.exports = {
  createCustomer: createCustomer,
  fetchCustomers: fetchCustomers,
};
