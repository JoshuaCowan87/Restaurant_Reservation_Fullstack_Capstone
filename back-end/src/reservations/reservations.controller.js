const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware
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
      message: "Reservation needs to be in the future",
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

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservations = await service.read(reservation_id);
  const reservation = reservations[0];
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation ${reservation_id} not found`,
  });
}

async function statusIsOnlyBooked(req, res, next) {
  const { status } = req.body.data;
  if (!status || status === "booked") return next();
  else
    return next({
      status: 400,
      message:
        "status to create a reservation must be `booked`, cannot be `seated` or `finished`",
    });
}

function reqHasValidPeople(req, res, next) {
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

function statusIsValid(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (validStatus.includes(status)) return next();
  else
    return next({
      status: 400,
      message:
        "Status must be `booked`, `seated` or `finished` or `cancelled`, cannot be `unknown`",
    });
}

async function currentStatusIsNotFinished(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "a `finished` status cannot be updated",
    });
  }
  return next();
}

//CRUDL

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.listByPhone(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const { data } = req.body;
  const newReservation = await service.create(data);
  res.status(201).json({ data: newReservation });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  const results = await service.read(reservation_id);
  const data = results[0];
  res.json({ data });
}

async function updateReservationStatus(req, res) {
  const { status } = req.body.data;
  const { reservation_id } = req.params;
  const data = await service.updateReservationStatus(status, reservation_id);
  res.status(200).json({ data });
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  const updatedData = { ...req.body.data };
  const data = await service.update(updatedData, reservation_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    eachFieldHasInput,
    statusIsOnlyBooked,
    timeAndDateValidation,
    reqHasValidDate,
    reqHasValidPeople,
    reqHasValidTime,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    currentStatusIsNotFinished,
    asyncErrorBoundary(updateReservationStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    eachFieldHasInput,
    timeAndDateValidation,
    reqHasValidDate,
    reqHasValidPeople,
    reqHasValidTime,
    asyncErrorBoundary(update),
  ],
};
