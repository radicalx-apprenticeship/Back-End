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

const updateAppren = async (userId, data, docId, ref = dbRef) => {
    return await ref.collection("apprenticeship")
        .doc(userId)
        .collection("apprenList")
        .doc(docId)
        .update(data)
}

const getAppren = async (userId, docId, ref = dbRef) => {
    // by default return the documents if no document id was passed
    if (!docId) {
        const snapshots = await ref.collection("apprenticeship")
            .doc(userId)
            .collection("apprenList")
            .get()

        return snapshots.docs.reduce((account, doc, _) => {
            account[doc.id] = doc.data()
            return account
        }, {})
    } 
    const snapshot = await ref.collection("apprenticeship")
        .doc(userId)
        .collection("apprenList")
        .doc(docId)
        .get()

    return snapshot.data() || {}
}

const deleteAppren = async (userId, docId, ref = dbRef) => {
    return await ref.collection("apprenticeship")
        .doc(userId) // This should be a passable parameter
        .collection("apprenList")
        .doc(docId)
        .delete()
}
module.exports = {
    createAppren,
    updateAppren,
    getAppren,
    deleteAppren 
}
