const messages = require("./message")
const errors = require("./status")

class BaseError extends Error {
    constructor(name, httpCode, description, isOp) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.code = httpCode
        this.isOp = isOp

        Error.captureStackTrace(this)
    }
}

class APIError extends BaseError {
    constructor(name, { httpCode = errors.INTERNAL, description = messages.INTERNAL_ERROR , isOp = true }) {
        super(name, httpCode, description, isOp)
    }
}

module.exports = {
    MULTER_UPLOAD: {
        NOT_ALLOWED_TYPE: "LIMIT_UNEXPECTED_FILE",
        NOT_MATCHED: "NOT_MATCHED",
        UNEXPECTED: "UNEXPECTED"
    }, 
    APIError
}
