const { ZodError } = require("zod")
const uploader = require("../../middlewares/uploader.js")
const statusCodes = require("../../helpers/status.js")
const Response = require("../../helpers/response.js")
const { NOT_ALLOWED_UPLOAD, SUCCESS_UPLOAD } = require("../../helpers/message.js")
/*
Upload Single content :
    - img
*/
const uploadImg = async (req, res) => {

    const mediaContentType = req.query["media_type"]
    if (mediaContentType !== "image" && mediaContentType !== "video")
        return res.status(statusCodes.NOT_ALLOWED)
            .send(new Response(
                false,
                NOT_ALLOWED_UPLOAD,
                ""
            ))
    uploader.single(mediaContentType)(req, res, async (err) => {
        try {
            // TODO: check different error messages
            if (err) 
                throw err

            res.send(new Response(true, SUCCESS_UPLOAD(mediaContentType), req.body))
        } catch(e) {
            console.log(e)
            res.status(statusCodes.BAD).send(new Response(
                false,
                e instanceof ZodError ? JSON.parse(e.message) : e.message,
                ""
            ))
        }
    })
}


module.exports = {
    uploadImg,
}
