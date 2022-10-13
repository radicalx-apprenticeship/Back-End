const firebaseAdmin = require("../../utils/firebaseAdmin.js")

// a ref to the firestore db
const dbRef = firebaseAdmin.firestore()

// add an apprenticeship to the firebase database thing
const createAppren = async (data) => {
    return await dbRef.collection("apprenticeship")
        .doc("userID") // TODO: pass the userid from the req.user after authorization of the user
        .collection("apprenList")
        .add(data)
}

module.exports = {
    createAppren 
}
