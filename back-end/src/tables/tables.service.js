const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((newTable) => newTable[0]);
}

// function update(reservation_id, table_id) {
//  // const updatedTable = {}
//   return knex.transaction((trx) => {
//     return knex("reservations")
//       .transacting(trx)
//       .where({ reservation_id })
//       .update({ status: "seated" })
//       .returning("*")
//       .then(() => {
//         return knex("tables")
//           .where({ table_id })
//           .update({ reservation_id })
//          // .returning("*")
//          // .then(result => (updatedTable = result[0]))
//       })
//       .then(trx.commit)
//       //.then(() => updatedTable)
//       .catch(trx.rollback);
//   });
// }
async function update(reservation_id, table_id) {
  const trx = await knex.transaction();
  let updatedTable = {};
  return trx("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() =>
      trx("tables")
        .where({ table_id })
        .update({ reservation_id }, [
          "table_id",
          "table_name",
          "capacity",
          "reservation_id",
        ])
        .then((result) => (updatedTable = result[0]))
    )
    .then(trx.commit)
    .then(() => updatedTable)
    .catch(trx.rollback);
      }
      
function finishTable (reservation_id, table_id) {
  return knex.transaction(trx => {
    return knex("reservations")
      .transacting(trx)
      .where({reservation_id})
      .update({status: "finished"})
      .returning("*")
      .then(() => {
        return knex("tables")
          .where({table_id})
          .update({reservation_id: null})
         
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}

module.exports = { list, read, create, update, finishTable };
