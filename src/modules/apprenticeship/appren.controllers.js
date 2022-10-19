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
        // document ID on firestore
        const docID = req.params['id']
        const data = apprenValidations.updateAppren(apprenData)

        const firebaseData = await apprenServices.updateAppren(data,docID)

        res.send(new Response(true, SUCCESS_UPDATE, firebaseData))
    } catch(e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""  
        ))
    }
}

//read an appreticeship
const readAppren = async (req, res) => {
    try {

        const doc = apprenValidations.readAppren(req.params)
        const firebaseData = await apprenServices.readAppren(doc.id)

        if(req.params.id == null){
            res.send(new Response(true, SUCCESS_READ, firebaseData))
            // no null checking for get all request
            // as the user could have no documents
        } 
        
        else 
        {        
            if(firebaseData.data() != undefined ){
                res.send(new Response(true, SUCCESS_READ, firebaseData))
            }
            else
            {
                res.send(new Response(true, NOT_FOUND_FAIL, firebaseData))
            }
 
        }

        // print the data to console 
       
    } catch(e) {
        res.status(statusCodes.BAD).send(new Response(
            false,
            e instanceof ZodError ? JSON.parse(e.message) : e.message,
            ""  
        ))
    }
}

// delete an apprenticeship
const clearAppren = async (req, res) => {
    try {

        const doc = apprenValidations.clearAppren(req.params)
        console.log(doc.id,typeof(doc.id),"lol")

        const firebaseData = await apprenServices.clearAppren(doc.id)
        console.log(firebaseData)
        
        res.send(new Response(true, SUSCCESS_DELETE, firebaseData))
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
    readAppren,
    clearAppren
}
