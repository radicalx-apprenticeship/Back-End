const router = require("express").Router()
const isAuthorized = require("../../middlewares/authUsers.js")
const apprenControllers = require("./appren.controllers.js")

// create an apprenticeship
router.post("/appren", isAuthorized, apprenControllers.createAppren)

// update an apprenticeship
router.put("/appren/:id", isAuthorized, apprenControllers.updateAppren)

// get apprenticeship/s
router.get("/appren/:id?", isAuthorized, apprenControllers.getAppren)

// delete an apprenticeship
router.delete("/appren/:id", isAuthorized, apprenControllers.deleteAppren)

module.exports = router
