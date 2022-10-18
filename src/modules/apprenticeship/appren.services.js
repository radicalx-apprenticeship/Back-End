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

const updateAppren = async (data,docID) => {
    return await dbRef.collection("apprenticeship")
        .doc("userID") // This should be a passable parameter
        .collection("apprenList")
        .doc(docID)
        .update(data) 
}

const readAppren = async (docID) => {
    // single docuemnt    
    if (docID) {
        return await dbRef.collection("apprenticeship")
            .doc("userID") // This should be a passable parameter
            .collection("apprenList")
            .doc(docID)
            .get()

    // all the documents    
    } else {
        return await dbRef.collection("apprenticeship")
            .doc("userID") // This should be a passable parameter
            .collection("apprenList")
            .get()  

    }
}

const clearAppren = async (docID) => {
    console.log("service: ", docID,typeof(docID) )
    return await dbRef.collection("apprenticeship")
        .doc("userID") // This should be a passable parameter
        .collection("apprenList")
        .doc(docID)
        .delete()
}
module.exports = {
    createAppren,
    updateAppren,
    readAppren,
    clearAppren
}
