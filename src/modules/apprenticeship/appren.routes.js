const router = require("express").Router()
const isAuthorized = require("../../middlewares/authUsers.js")
const apprenControllers = require("./appren.controllers.js")

// create an apprenticeship
router.post("/appren", isAuthorized, apprenControllers.createAppren)

module.exports = router
