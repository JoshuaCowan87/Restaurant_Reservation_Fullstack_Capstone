const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

validFields = ["table_name", "capacity"]

function reqHasAllFields (req, res, next) {
const {data} = req.body;
console.log("data", data)
try {
    validFields.forEach(field => {
        if (!data[field]) {
            const error = new Error(`A '${fields}' is required.`);
        error.status = 400;
        throw error;
        }
    })
} catch(error) {
     next(error)
}
}

function reqHasTableName (req, res, next) {
const {table_name} = req.body.data;
const array = table_name.split("")
if (table_name && array.length >= 2) {
    return next()
}
else return next ({
    status: 400,
    message: "table_name must be 2 characters or more"
})
}

function reqHasCapacity (req, res, next) {
    const {capacity} = req.body.data;
    if (capacity && typeof capacity === "number" && Number(capacity) > 0) {
        return next()
    }
    else return next({
        status:400,
        message: "capacity must be a number larger than 0"
    })
}

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
    create: [reqHasTableName, reqHasCapacity, reqHasAllFields, create]
}