//const { default: knex } = require("knex")
const knex = require("../db/connection")

function list () {
return knex("reservations")
    .select("*")
}

function listByDate (reservation_date) {
    return knex("reservations")
        .select("*")
        .where({reservation_date})
        .orderBy("reservation_time")
}

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(newReservation => newReservation[0])
}

module.exports = {
    list, listByDate, create}