const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

// init the express app
const app = express()


// app middlewares
app.use(express.json()) // for parsing JSON responses
app.use(express.urlencoded({extended: true})) // for parsing incoming requests with urlencoded payloads
app.use(helmet()) // adds some security to the server
app.use(cors()) // to be able to call the server from different location::port


module.exports = app
