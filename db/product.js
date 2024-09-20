const client = require("./client.js");

const createProduct = async (productName) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO product (name)
            VALUES ('${productName}')
            RETURNING *;
        `);
    const product = rows[0];
    return product;
  } catch (err) {
    console.log("ERROR CREATING PRODUCT: ", err);
  }
};

const fetchProducts = async () => {
  try {
   const { rows } =  await client.query(`
      SELECT * FROM product;
    `);
    return rows;
  } catch (err) {
    console.log('ERROR FETCHING PRODUCTS: ', err);
  }
};

module.exports = {
  createProduct: createProduct,
  fetchProducts: fetchProducts,
};
