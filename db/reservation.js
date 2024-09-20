const client = require("./client.js");

const createReservation = async (reservationDate, partyCount, restaurantId, customerId) => {
  try {
    const { rows } = await client.query(`
            INSERT INTO reservation (date, party_count, restaurant_id, customer_id)
            VALUES ('${reservationDate}', ${partyCount},'${restaurantId}', '${customerId}')
            RETURNING *;
        `);
    const reservation = rows[0];
    return reservation;
  } catch (err) {
    console.log("ERROR CREATING RESERVATION: ", err);
  }
};

const fetchReservations = async () => {
  try {
   const { rows } =  await client.query(`
      SELECT * FROM reservation;
    `);
    return rows;
  } catch (err) {
    console.log('ERROR FETCHING RESERVATIONS: ', err);
  }
};

const destroyReservation = async (reservationId) => {
  try {
    await client.query(
      `
        DELETE FROM reservation WHERE id = $1
      `,
      [reservationId]
    );
  } catch (err) {
    console.log("ERROR DELETING RESERVATION: ", err);
  }
};

module.exports = {
  createReservation: createReservation,
  fetchReservations: fetchReservations,
  destroyReservation: destroyReservation,
};
