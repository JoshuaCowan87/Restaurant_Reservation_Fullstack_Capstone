const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

validFields = ["table_name", "capacity"];

function bodyHasData(req, res, next) {
  const data = req.body.data;
  if (data) return next();
  else
    return next({
      status: 400,
      message: "All fields need valid input",
    });
}

function bodyHasResId(req, res, next) {
  const { reservation_id } = req.body.data;
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_id is required",
  });
}



async function tableIdExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${table_id} does not exist`,
  });
}

async function resIdExists(req, res, next) {
  const { reservation_id } = req.body.data;
//  console.log("resIdExists res_id", reservation_id)
  const reservations = await reservationsService.read(reservation_id);
  const reservation = reservations[0]
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else
    return next({
      status: 404,
      message: `${reservation_id} does not exist`,
    });
}



function reqHasTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name && table_name.length >= 2) {
    return next();
  } else
    return next({
      status: 400,
      message: "table_name must be 2 characters or more",
    });
}

async function tableHasCapacity(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (res.locals.reservation.people > Number(table.capacity)) {
    return next({
      status: 400,
      message: "Table capacity is too small for reservation size",
    });
  }
  next();
}

async function tableIsOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table.reservation_id === null) {
    return next();
  }
  next({
    status: 400,
    message: "This table is already occupied",
  });
}

async function tableIsUnoccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table.reservation_id === null) {
    return next({
      status: 400,
      message: "Table is not occupied",
    });
  }
  return next();
}

function reqHasCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity && typeof capacity === "number" && Number(capacity) > 0) {
    return next();
  } else
    return next({
      status: 400,
      message: "capacity must be a number larger than 0",
    });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res, next) {
  const newTable = req.body.data;
  const data = await service.create(newTable);
  res.status(201).json({ data });
}
async function reservationIsAlreadySeated (req, res, next) {
 // console.log("res.locals.res.status", res.locals.reservation, res.locals.reservation.status)
if (res.locals.reservation.status === "seated") {
  return next({
    status:400,
    message: "This reservation is already seated"
  })
}
else return next()
}

async function update(req, res) {
  const { table_id } = req.params;
  const {
    data: { reservation_id },
  } = req.body;
 const data = await service.update(reservation_id, table_id);
  // //  console.log("results", results)
  // //  const result = results[0]
  // //  console.log("result". result)
  // // // const data = result.status
  // // // console.log("data", data)
  // const results = await reservationsService.read(reservation_id);
  // console.log("results", results)
  // const data = results[0];
  // // const data = result.status
  //const data = await service.read(table_id)
 // console.log("data", data)
  res.json({ data });
}

async function finishTable(req, res, next) {
  const { table_id, reservation_id } = res.locals.table;
  //console.log("res.locals.table", res.locals.table)
  const data = await service.finishTable(reservation_id, table_id);
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasData,
    reqHasTableName,
    reqHasCapacity,
    asyncErrorBoundary(create),
  ],
  update: [
    bodyHasData,
    bodyHasResId,
    asyncErrorBoundary(resIdExists),
    reservationIsAlreadySeated,
    asyncErrorBoundary(tableHasCapacity),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(update),
  ],
  finishTable: [
    tableIdExists,
    tableIsUnoccupied,
    asyncErrorBoundary(finishTable),
  ],
};
