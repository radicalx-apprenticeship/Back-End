const uploader = require("../../middlewares/uploader.js")
const statusCodes = require("../../helpers/status.js")
const Response = require("../../helpers/response.js")
const { streamToCloud, getRemoteUrl } = require("../../utils/googleCloud.js")
const { ALLOWED_MULTER_UPLOAD } = require("../../helpers/allowedTypes.js")
const mediaValidations = require("./media.validations.js")
const { SUCCESS_UPLOAD } = require("../../helpers/message.js")
const { APIError } = require("../../helpers/errors.js")
const message = require("../../helpers/message.js")
const { MulterError } = require("multer")

/*
Upload Single content :
    - image
    - video
*/
const uploadContent = async (req, res) => {
    try {
        const mediaContentType = req.params.type
        if (!ALLOWED_MULTER_UPLOAD.includes(mediaContentType))
            // TODO: move not supported
            throw new APIError("NOT_SUPPORTED", {
                httpCode: statusCodes.NOT_ALLOWED,
                description: message.NOT_ALLOWED_UPLOAD,
                isOp: false
            })

        uploader.single(mediaContentType)(req, res, async (err) => {
            try {
                // throw errors if failed
                mediaValidations.validateRequestFile(err)
                res.send(new Response(true, SUCCESS_UPLOAD(mediaContentType), getRemoteUrl(req.file)))
                streamToCloud(req.file)
            } catch(e) {
                res.status(e instanceof MulterError ? statusCodes.BAD : e.code)
                    .send(new Response(
                        false,
                        e.message,
                        ""
                    ))
            }
        })
    } catch (err) {
        res.status(err.code || statusCodes.BAD)
            .send(new Response(
                false,
                e.message,
                ""
            ))
    }
}

module.exports = {
    uploadContent,
}
