const router = require("express").Router()
const isAuthorized = require("../../middlewares/authUsers.js")
const mediaControllers = require("./media.controllers.js")

// upload single content: img/vid
router.post("/media/:type", isAuthorized, mediaControllers.uploadContent)

router.delete("/media/:filename", isAuthorized, mediaControllers.deleteContent)

module.exports = router
