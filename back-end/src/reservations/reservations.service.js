//const { default: knex } = require("knex")
const knex = require("../db/connection");

function list() {
  return knex("reservations").select("*");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}
// date format, in postGRES
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

function listByPhone(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
  list,
  listByDate,
  listByPhone,
  create,
};
