const message = require("../helpers/message.js")
const statusCodes = require("../helpers/status.js")
const firebaseAdmin = require("../utils/firebaseAdmin.js")
const Response = require("../helpers/response.js")

// check if the token being sent from the FE aka firebase is valid through the firebase SDK
// the token is JWT btw
const isAuthorized = async (req, res, next) => {
    try {
        let token = null
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer")
            token = req.headers.authorization.split(' ')[1]

        // after decoding the JWT token, we can extract some info about the user
        // it's also good to attach the user to the req, so that you can access some info anytime.

        /* 
            verifyIdToken(token, checkRevoked)
            If `checkRevoked` is set to true, first verifies whether the corresponding
            user is disabled. If yes, an `auth/user-disabled` error is thrown. If no,
            verifies if the session corresponding to the ID token was revoked. If the
            corresponding user's session was invalidated, an `auth/id-token-revoked`
            error is thrown. If not specified the check is not applied.
        */

        const user = await firebaseAdmin.auth().verifyIdToken(token)

        req.user = user

        next()
            
    } catch (e) {
        res.status(statusCodes.UNAUTHORIZED)
            .send(new Response(false, message.AUTH_FAIL, ""))
    }
}

module.exports = isAuthorized
