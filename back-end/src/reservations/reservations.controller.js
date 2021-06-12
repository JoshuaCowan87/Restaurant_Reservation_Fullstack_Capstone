const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

const validProperties = [
  "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"
]

function reqHasBody (req, res, next) {
  const body = req.data.body;
  if (body) {
    return next()
  }
  else {
    return next({
      status: 404,
      message: "request must have body"
    })
  }
}

function reqHasAllValidProperties (req, res, next) {

}

async function list(req, res) {
 const data = await service.list();
  res.json({data})
}

async function listByDate(req, res) {
  const {reservation_date} = req.query
  console.log("controller date", typeof reservation_date)
  const data = await service.listByDate(reservation_date);
  res.json({data})
}

async function create (req, res) {
const {data} = req.body
console.log(data)
}

module.exports = {
 list: asyncErrorBoundary(list),
 listByDate: asyncErrorBoundary(listByDate),
 create: [reqHasBody, reqHasAllValidProperties, asyncErrorBoundary(create)]
};
