//const { default: knex } = require("knex")
const knex = require("../db/connection")

function list () {
return knex("reservations")
    .select("*")
}

function listByDate (reservation_date) {
    console.log(knex("reservations")
    .select("*")
    .where({reservation_date: reservation_date})
    .orderBy("reservation_time").toSQL())
console.log("listBydAte, res_date", reservation_date)
    return knex("reservations")
        .select("*")
        .where({reservation_date})
        .orderBy("reservation_time")
}
// date format, in postGRES
function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(newReservation => newReservation[0])
}

module.exports = {
    list, listByDate, create}