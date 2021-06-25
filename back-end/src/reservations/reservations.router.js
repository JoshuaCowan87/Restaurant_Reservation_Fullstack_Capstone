/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */
const methodNotAllowed = require ("../errors/methodNotAllowed")
const router = require("express").Router();
const controller = require("./reservations.controller");



router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

router.route("/:id")
    .get(controller.read)


module.exports = router;
