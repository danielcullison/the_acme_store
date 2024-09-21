const express = require("express");
const app = express();

const client = require("./db/client.js");
client.connect();

app.use(express.json());

const { fetchUsers } = require("./db/user.js");
const { fetchProducts } = require("./db/product.js");
const {
  fetchFavorites,
  createFavorite,
  destroyFavorite,
} = require("./db/favorite.js");

app.get("/api/users", async (req, res, next) => {
  try {
    const allUsers = await fetchUsers();

    res.send(allUsers);
  } catch (err) {
    console.log("ERROR GETTING USERS: ", err);
  }
});

app.get("/api/products", async (req, res, next) => {
  try {
    const allProducts = await fetchProducts();

    res.send(allProducts);
  } catch (err) {
    console.log("ERROR GETTING PRODUCTS: ", err);
  }
});

app.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userFavorites = await fetchFavorites(userId);

    res.send(userFavorites);
  } catch (err) {
    console.log("ERROR GETTING USER FAVORITES: ", err);
  }
});

app.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
  try {
    const favoriteId = req.params.id;
    const userId = req.params.userId;

    await destroyFavorite(favoriteId);

    res.status(204).send();
  } catch (err) {
    console.log("ERROR DELETING FAVORITE: ", err);
  }
});

app.post("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { product_id } = req.body;

    const newFavorite = await createFavorite(product_id, userId);
    res.status(201).send(newFavorite);
  } catch (err) {
    console.log("ERROR ADDING FAVORITE: ", err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
