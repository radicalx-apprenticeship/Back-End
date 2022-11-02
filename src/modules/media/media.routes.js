const router = require("express").Router()
const isAuthorized = require("../../middlewares/authUsers.js")
const mediaControllers = require("./media.controllers.js")

// upload single content: img/vid
router.post("/media/:type", isAuthorized, mediaControllers.uploadContent)

module.exports = router
