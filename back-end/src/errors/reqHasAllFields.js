//const { next } = require("../../../front-end/src/utils/date-time");

const validFields = [
    "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"
  ]

function reqHasAllFields (validFields) {
    return function (req, res, next) {
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
}

module.exports = reqHasAllFields;