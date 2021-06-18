const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")




const validFields = [
  "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"
]

// function eachFieldHasInput (req, res, next) {
//   const {data = {}} = req.body;
//   validFields.forEach(field => {
//     if (!data[field]) {
//       return next ({
//         status: 400,
//         message: `A ${field} is required`
//       })
//     }
//     else next()
//   })
// }

function eachFieldHasInput (req, res, next) {
const { data = {} } = req.body;

    try {
      validFields.forEach((fields) => {
        if (!data[fields]) {
          const error = new Error(`A '${fields}' is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  }

// function hasOnlyNecessaryFields (req, res, next) {
// const { data = {}} = req.body;
// console.log("allfields data", data);
// const missingFields = Object.keys(data).filter(field => {
//   !validFields.includes(field) 
//   })
//   console.log("missing fields", missingFields)
//   if (missingFields.length > 0) {
//     return next({
//       status: 400,
//       message: `${missingFields.join(" ,")} is required`
//     })
//   }
//   next()
// }


function reqHasValidPeople(req, res, next) {
  req.body.data.people = Number(req.body.data.people)
  console.log("p", typeof req.body.data.people, req.body.data.people)
  const people = Number(req.body.data.people);
  const isValid = Number.isInteger(people);
  console.log("isValid", isValid)
  console.log("people", typeof people, people)
  if (people > 0 && isValid ) {
    return next()
  }
next ({
  status: 400,
  message: `Reservations require more than 1 person`
}) 
}

function reqHasValidDate (req, res, next) {
  const date = req.body.data.reservation_date;
  const isValid = Date.parse(date);
console.log("date", date)
console.log("isValid", isValid)
  if (date && isValid) {
    return next ()
  }
  next({
    status:400,
    message: `A valid date is required`
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
    message: `A vaid time is required`
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
const newReservation = await service.create(data)
console.log("newRes", newReservation)
res.status(201).json( {data: newReservation})
}

module.exports = {
 list: asyncErrorBoundary(list),
 listByDate: asyncErrorBoundary(listByDate),
 create: [
  eachFieldHasInput,
   // hasOnlyNecessaryFields, 
   reqHasValidDate, 
   reqHasValidPeople, 
  reqHasValidTime, 
   asyncErrorBoundary(create)]
};
