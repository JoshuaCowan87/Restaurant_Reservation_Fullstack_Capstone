const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/")
    .get(controller.list)
    .post(controller.create)
    .methodNotAllowed

router.route("/:table_id/seat")
    .put(controller.update)
    .delete(controller.finishTable)
    .methodNotAllowed


    module.exports = router;