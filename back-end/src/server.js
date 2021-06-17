const { PORT = 5000 } = process.env;
const app = require("./app");
const knex = require("./db/connection");
/* might need for heroku deoplyment
const express = require('express')
const cors = require('cors')

const app = express()
const router = express.Router()
*/



knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
