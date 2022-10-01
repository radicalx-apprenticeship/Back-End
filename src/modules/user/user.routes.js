const router = require("express").Router()
const userControllers = require("./user.controllers.js")

// create a simple account in firebase
router.post("/register", userControllers.registerUser)

module.exports = router
