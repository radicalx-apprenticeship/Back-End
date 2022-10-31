/*
1. Upload to main the server.
2. Validate the content.
3. Store to a cloud server.
*/
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const getRandomName = require("../helpers/uuid")

// the location where things are stored
const LOC = `../../${process.env.MEDIA}`
const MAX_SIZE = {
    content: parseFloat(process.env.SIZE)  * 1024 * 1024,
    img : parseFloat(process.env.IMG_SIZE) * 1024 * 1024,
    vid : parseFloat(process.env.VID_SIZE) * 1024 * 1024,
}

// the settings for the multer storage
const settings = multer.diskStorage({
    filename: function (_, file, cb) {
        // d72a148c-87d3-47bd-89ee-59709b43cbdd.png
        const fileName = `${getRandomName()}${path.extname(file.originalname)}`

        // Error, filename
        cb(null, fileName)
    },
    destination: function (req, _, cb) {
        const userId = req.user.uid

        // save data to that userid
        const locationOnDisk = path.join(__dirname, LOC, userId)

        // create the dir (if not exist)
        fs.mkdirSync(locationOnDisk, { recursive: true })

        // Error, destination
        cb(null, locationOnDisk)
    },
})

module.exports = multer({
    storage: settings,
    limits: {
        fileSize: MAX_SIZE.content,
    },
    fileFilter: function (req, file, cb) {
        // imgs only
        const fileSize = parseFloat(req.headers["content-length"]) // TODO: not the best thing to do
        if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") && fileSize <= MAX_SIZE.img) {
            cb(null, true)
        }else if (file.mimetype === "video/mp4" && fileSize <= MAX_SIZE.vid) {
            cb(null, true)
        }else {
            cb({message: "NOT_ALLOWED"}) // TODO: generalize this to a central place
        }
    }
})
