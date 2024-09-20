const express = require("express");
const app = express();

const client = require("./db/client.js");
client.connect();

app.use(express.json());

const { fetchCustomers } = require("./db/customer.js");
const { fetchRestaurants } = require("./db/restaurant.js");
const { fetchReservations, createReservation, destroyReservation } = require("./db/reservation.js");

app.get("/api/customers", async (req, res, next) => {
  try {
    const allCustomers = await fetchCustomers();

    res.send(allCustomers);
  } catch (err) {
    console.log("ERROR GETTING CUSTOMERS: ", err);
  }
});

app.get("/api/restaurants", async (req, res, next) => {
  try {
    const allRestaurants = await fetchRestaurants();

    res.send(allRestaurants);
  } catch (err) {
    console.log("ERROR GETTING RESTAURANTS: ", err);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    const allReservations = await fetchReservations();

    res.send(allReservations);
  } catch (err) {
    console.log("ERROR GETTING RESERVATIONS: ", err);
  }
});

app.delete("/api/reservations/:id", async (req, res, next) => {
  try {
    const reservationId = req.params.id;

    await destroyReservation(reservationId);

    res.status(204).send();
  } catch (err) {
    console.log("ERROR DELETING RESERVATION: ", err);
  }
});

app.post("/api/reservations", async (req, res, next) => {
  try {
    const newReservation = await createReservation(req.body.date, req.body.party_count, req.body.restaurant_id, req.body.customer_id);
    res.status(201).send(newReservation);
  } catch (err) {
    console.log("ERROR ADDING RESERVATION: ", err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
