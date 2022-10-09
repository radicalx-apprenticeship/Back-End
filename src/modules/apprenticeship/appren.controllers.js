const { ZodError } = require("zod")
const Response = require("../../helpers/response.js")
const statusCodes = require("../../helpers/status.js")
const apprenValidations = require("./appren.validations.js")
const apprenServices = require("./appren.services.js")
const { SUCCESS_ADD } = require("../../helpers/message.js")

// create an apprenticeship
const createAppren = async (req, res) => {
    try {
        const apprenData = req.body 
        const data = apprenValidations.createAppren(apprenData)

        const firebaseData = await apprenServices.createAppren(data)

        res.send(new Response(true, SUCCESS_ADD, firebaseData))
        
    } catch (e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}

module.exports = {
    createAppren 
}
