const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function list (req, res, next) {
    const data = await service.list();
    res.json({data})
}
async function create(req, res, next) {
    const newTable = req.body.data;
    console.log("newTable", newTable)
    const data = await service.create(newTable);
    res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    create
}