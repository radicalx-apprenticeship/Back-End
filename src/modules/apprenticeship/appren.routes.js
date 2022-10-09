const router = require("express").Router()
const apprenControllers = require("./appren.controllers.js")

// create an apprenticeship
// TODO: add the auth middleware here
router.post("/appren", apprenControllers.createAppren)

module.exports = router
