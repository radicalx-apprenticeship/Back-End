const { ZodError } = require("zod")
const Response = require("../../helpers/response.js")
const statusCodes = require("../../helpers/status.js")
const userServices = require("./user.services.js")
const userValidation = require("./user.validation.js")

// create a firebase user
const registerUser = async (req, res) => {
    try {
        const userRegisteration = req.body // validate 
        const data = userValidation.register(userRegisteration) // throw an error if data isn't validated else would return the actual data.

        // register an account 
        const user = await userServices.createUser(data)

        res.send(new Response(true, "Success", user))
        
    } catch (e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}

module.exports = {
    registerUser
}
