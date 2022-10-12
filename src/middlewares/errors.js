const Response = require("../helpers/response.js") 
const { NOT_FOUND_FAIL, SYNTAX_FAIL } = require("../helpers/message.js")
const { NOT_FOUND, BAD } = require("../helpers/status.js")

const notFound = (req, res, next) => {
    res.status(NOT_FOUND)
        .send(new Response(false, NOT_FOUND_FAIL, ""))
}

const syntaxError = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(BAD)
        .send(new Response(false, SYNTAX_FAIL, ""))
  } else {
    next()
  }
}

module.exports = {
    notFound,
    syntaxError
}
