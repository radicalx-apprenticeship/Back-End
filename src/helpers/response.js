module.exports = class Response {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode
        this.message = message 
        this.data = data 
    }
}
