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

module.exports = {
    list, listByDate}