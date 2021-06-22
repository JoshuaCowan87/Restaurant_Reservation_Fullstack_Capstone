// const tables = require("./01-tables.json")

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex
//     .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
//     .then( function() {
//       return knex("tables").insert(tables)
//     })
//   // return knex('table_name').del()
//   //   .then(function () {
//   //     // Inserts seed entries
//   //     return knex('table_name').insert([
//   //       {id: 1, colName: 'rowValue1'},
//   //       {id: 2, colName: 'rowValue2'},
//   //       {id: 3, colName: 'rowValue3'}
//   //     ]);
//   //   });
// };
exports.seed = async() => {}