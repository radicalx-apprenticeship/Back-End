const firebaseAdmin = require("../../utils/firebaseAdmin.js")

// a ref to the firestore db
const dbRef = firebaseAdmin.firestore()

// add an apprenticeship to the firebase database thing
// the ref can redirect the firestore instance to either remote or localhost (passed)
const createAppren = async (userId, data, ref = dbRef) => {
    return await ref.collection("apprenticeship")
        .doc(userId)
        .collection("apprenList")
        .add(data)
}

module.exports = {
    createAppren 
}
