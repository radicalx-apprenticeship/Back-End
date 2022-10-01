const serviceAccount = require("../config/firebase-admin-keys.json")
const firebaseAdmin = require("firebase-admin")

// creating a firebase admin instance
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
})

module.exports = firebaseAdmin 
