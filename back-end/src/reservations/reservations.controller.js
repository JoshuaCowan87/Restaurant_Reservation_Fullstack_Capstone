const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function timeAndDateValidation(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const dayOfWeek = new Date(reservation_date).getUTCDay();
  const today = new Date();
  const resDate = new Date(reservation_date);

  if (dayOfWeek === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  }
  if (today > resDate) {
    return next({
      status: 400,
      message: "Reservation must be in the future",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "reservation_time must be between 1030am and 930pm",
    });
  } else return next();
}

function eachFieldHasInput(req, res, next) {
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



function reqHasValidPeople(req, res, next) {
  //req.body.data.people = Number(req.body.data.people)
  const people = req.body.data.people;
  const isValid = Number.isInteger(people);
  if (people > 0 && isValid) {
    return next();
  }
  return next({
    status: 400,
    message: `Reservations require more than 1 people`,
  });
}

function reqHasValidDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const isValid = Date.parse(date);

  if (isValid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date.`,
  });
}

function reqHasValidTime(req, res, next) {
  const time_regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  if (!time_regex.test(time)) {
    return next({
      status: 400,
      message: `reservation_time is not a valid time`,
    });
  }
  return next();
}

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

// async function listByDate(req, res) {
//   const {reservation_date} = req.query
//   const data = await service.listByDate(reservation_date);
//   res.json({data})
// }

async function create(req, res) {
  const { data } = req.body;
  const newReservation = await service.create(data);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  //listByDate: asyncErrorBoundary(listByDate),
  create: [
    eachFieldHasInput,
    timeAndDateValidation,
    reqHasValidDate,
    reqHasValidPeople,
    reqHasValidTime,
    asyncErrorBoundary(create),
  ],
};
