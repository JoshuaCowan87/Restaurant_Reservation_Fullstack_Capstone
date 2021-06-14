const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
//const service = require("./reservations.service")
//const reqHasValidProperties = require("./reqHasValidProperties")
//const reqHasAllFields = require("./reqHasAllFields")
//const reqHasOnlyValidProperties = require("./reqHasOnlyValidProperties")



const validFields = [
  "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"
]

function reqHasAllFields (req, res, next) {
const {data = {} } = req.body;
validFields.forEach(field => {
  if (!data[field]) {
      return next({
          status: 400,
          message: `${field} is required`
      })
  }
  next()
})
}


  function reqHasOnlyValidProperties (req, res, next) {
    const {data = {}} = req.body;
    const invalidFields = Object.keys(data).filter(field => {
      !validFields.includes(field)
    })
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Request must include a valid ${invalidFields.join(", ")}`
      })
    }
    next()
    }
  

function reqHasBody (req, res, next) {
  const body = req.body;
  if (body) {
    return next()
  }
  else {
    return next({
      status: 400,
      message: "request must have body"
    })
  }
}

function reqHasValidPeople(req, res, next) {
  const people = req.body.data.people;
  const isValid = Number.isInteger(people);

  if (people > 0 && isValid) {
    return next
  }
next ({
  status: 400,
  message: `Need more than 1 person`
}) 
}

function reqHasValidDate (req, res, next) {
  const date = req.body.data.reservation_date;
  const isValid = Date.parse(date);
console.log("date", date)
console.log("isValid", isValid)
  if (isValid) {
    return next ()
  }
  next({
    status:400,
    message: `${date} is not a valid date`
  })
}

function reqHasValidTime(req, res, next) {
 
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const isValid = time.match(regex);

  if (isValid) {
    return next()
  }
  next({
    status:400,
    message: `${time} is not a valid time`
  })
}
async function list(req, res) {
 const data = await service.list();
  res.json({data})
}

async function listByDate(req, res) {
  const {reservation_date} = req.query

  const data = await service.listByDate(reservation_date);
  res.json({data})
}

async function create (req, res) {
const {data} = req.body;
console.log("data", data)
const newReservation = await service.create(data)
console.log("newRes", newReservation)
res.status(201).json( {data: newReservation})
}

module.exports = {
 list: asyncErrorBoundary(list),
 listByDate: asyncErrorBoundary(listByDate),
 create: [
  reqHasOnlyValidProperties, 
  reqHasAllFields, 
  reqHasValidDate, 
  reqHasValidPeople, 
  reqHasValidTime, 
   asyncErrorBoundary(create)]
};
