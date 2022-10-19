const { ZodError } = require("zod")
const Response = require("../../helpers/response.js")
const statusCodes = require("../../helpers/status.js")
const apprenValidations = require("./appren.validations.js")
const apprenServices = require("./appren.services.js")
const { SUCCESS_ADD,SUCCESS_UPDATE,SUCCESS_READ,NOT_FOUND_FAIL,SUSCCESS_DELETE } = require("../../helpers/message.js")

// create an apprenticeship
const createAppren = async (req, res) => {
    try {
        const apprenData = req.body 
        const data = apprenValidations.createAppren(apprenData)

        const firebaseData = await apprenServices.createAppren(req.user.uid, data)

        res.send(new Response(true, SUCCESS_ADD, firebaseData))
        
    } catch (e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}

// update an apprenticeship
const updateAppren = async (req, res) => {
    try {
        const apprenData = req.body 
        const docId = apprenValidations.validateId(req.params)
        const data = apprenValidations.updateAppren(apprenData)

        const firebaseData = await apprenServices.updateAppren(req.user.uid, data, docId.id)

        res.send(new Response(true, SUCCESS_UPDATE, ""))

    } catch(e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}

// get an appreticeship
const getAppren = async (req, res) => {
    try {
        let doc
        if (req.params.id)
            doc = apprenValidations.validateId(req.params)
        const firebaseData = await apprenServices.getAppren(req.user.uid, doc?.id)

        res.send(new Response(true, SUCCESS_READ, firebaseData))
       
    } catch(e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}

// delete an apprenticeship
const deleteAppren = async (req, res) => {
    try {
        const doc = apprenValidations.validateId(req.params)
        const firebaseData = await apprenServices.deleteAppren(req.user.uid, doc.id)
        
        res.send(new Response(true, SUSCCESS_DELETE, ""))
    } catch(e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""
        ))
    }
}
module.exports = {
    createAppren,
    updateAppren,
    getAppren,
    deleteAppren 
}
