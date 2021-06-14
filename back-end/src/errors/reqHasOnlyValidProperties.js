
const validFields = [
  "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"
]

  function reqHasOnlyValidProperties (validFields) {
     return function (req, res, next) {
    const {data = {}} = req.body;
    const invalidFields = Object.keys(data).filter(field => {
      !validFields.includes(field)
    })
    if (!invalidFields.length) {
      return next({
        status: 400,
        message: `Request must include a valid ${invalidFields.join(", ")}`
      })
    }
    next()
    }
  }

  module.exports = reqHasOnlyValidProperties;