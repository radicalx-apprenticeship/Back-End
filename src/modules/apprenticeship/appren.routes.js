const router = require("express").Router()
const apprenControllers = require("./appren.controllers.js")

// create an apprenticeship
// TODO: add the auth middleware here
router.post("/appren", apprenControllers.createAppren)

// update an apprenticeship
router.put("/appren/:id", apprenControllers.updateAppren)

// read an apprenticeship
router.get("/appren/:id",apprenControllers.readAppren)
router.get("/appren",apprenControllers.readAppren)

// delete an apprenticeship
router.delete("/appren/:id", apprenControllers.clearAppren)

module.exports = router
