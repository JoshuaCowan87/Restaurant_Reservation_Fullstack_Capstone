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
  const reservation = await reservationsService.read(reservation_id);
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

async function isTableOccupied(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table.reservation_id === null) {
    return next();
  }
  next({
    status: 400,
    message: "Table is already occupied",
  });
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

async function update(req, res) {
  const { table_id } = req.params;
  const {
    data: { reservation_id },
  } = req.body;
  const data = await service.update(reservation_id, table_id);
  res.json({ data });
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
    asyncErrorBoundary(tableHasCapacity),
    asyncErrorBoundary(isTableOccupied),
    asyncErrorBoundary(update),
  ],
};
