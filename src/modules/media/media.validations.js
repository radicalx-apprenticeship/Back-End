const { MULTER_UPLOAD, APIError } = require("../../helpers/errors")
const message = require("../../helpers/message")
const status = require("../../helpers/status")

const validateRequestFile = (err) => {
    if (err?.name == MULTER_UPLOAD.NOT_ALLOWED_TYPE || err?.name == MULTER_UPLOAD.NOT_MATCHED) 
        throw new APIError(MULTER_UPLOAD.NOT_MATCHED, {
            httpCode: status.NOT_ALLOWED,
            description: message.NOT_ALLOWED_UPLOAD,
            isOp: false
        })
    if (err?.name == MULTER_UPLOAD.UNEXPECTED) 
        throw new APIError(MULTER_UPLOAD.UNEXPECTED, {
            httpCode: status.NOT_ALLOWED,
            description: message.UNEXPECTED_UPLOAD,
            isOp: true
        })
    // TODO: any type of errors 
    if (err) throw err
}

module.exports = {
    validateRequestFile
}
