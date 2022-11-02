const { ZodError } = require("zod")
const uploader = require("../../middlewares/uploader.js")
const statusCodes = require("../../helpers/status.js")
const Response = require("../../helpers/response.js")
const { NOT_ALLOWED_UPLOAD, SUCCESS_UPLOAD, UNEXPECTED_UPLOAD } = require("../../helpers/message.js")
const { streamToCloud } = require("../../utils/googleCloud.js")

/*
Upload Single content :
    - image
    - video
*/
const uploadContent = async (req, res) => {

    const mediaContentType = req.params.type
    if (mediaContentType !== "image" && mediaContentType !== "video")
        return res.status(statusCodes.NOT_ALLOWED)
            .send(new Response(
                false,
                NOT_ALLOWED_UPLOAD,
                ""
            ))
    uploader.single(mediaContentType)(req, res, async (err) => {
        try {
            if (err?.code == "LIMIT_UNEXPECTED_FILE" || err?.code == "NOT_MATCHED") 
                throw {code: statusCodes.NOT_ALLOWED, message: NOT_ALLOWED_UPLOAD} // TODO: define server side errors

            if (err?.code == "UNEXPECTED") 
                throw {code: statusCodes.NOT_ALLOWED, message: UNEXPECTED_UPLOAD} // TODO: define server side errors

            if (err)
                throw err

            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`
            res.send(new Response(true, SUCCESS_UPLOAD(mediaContentType), publicUrl))

            streamToCloud(req.file)

        } catch(e) {
            res.status(e.code || statusCodes.BAD).send(new Response(
                false,
                e instanceof ZodError ? JSON.parse(e.message) : e.message,
                ""
            ))
        }
    })
}


module.exports = {
    uploadContent,
}
