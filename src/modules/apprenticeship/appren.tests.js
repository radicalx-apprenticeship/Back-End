const serviceAccount = require("../../config/firebase-admin-keys.json")
const firebaseTesting = require("@firebase/rules-unit-testing")
const firebaseConfig = require("../../../firebase.json")
const { createAppren, updateAppren, deleteAppren, getAppren } = require("./appren.services")
const { APPREN_CREATE, APPREN_EDIT_SHALLOW } = require("../../config/tests/dummy")

describe("Apprenticeship UTs: ", () => {
    const userId = "123"
    let firestoreInst 
    let fbt // firebase instance
    let docId
    beforeAll(async () => {
        fbt = await firebaseTesting.initializeTestEnvironment({
            firestore: {
                port: firebaseConfig.emulators.firestore.port,
                host: firebaseConfig.emulators.firestore.host
            },
            projectId: serviceAccount.project_id
        })
        firestoreInst = fbt.authenticatedContext("user_id").firestore()
    })

    afterAll(async () => {
        await fbt.clearFirestore()
    })
    it("Should create an apprenticeship", async () => {
        const appren = await createAppren(userId, APPREN_CREATE, firestoreInst)

        docId = appren.id
        expect(appren.id).toBeTruthy()
    })

    it("Should get all apprenticeships", async () => {
        const apprens = await getAppren(userId, undefined, firestoreInst)
        expect(apprens[docId]).toBeTruthy()
    })

    it("Should get an apprenticeship by ID", async () => {
        const appren = await getAppren(userId, docId, firestoreInst)
        expect(appren).toEqual(APPREN_CREATE)
    })
    // TODO: Fix the update shallow vs update path
    it("Should edit an apprenticeship", async () => {
        await updateAppren(userId, APPREN_EDIT_SHALLOW, docId, firestoreInst)
        const appren = await getAppren(userId, docId, firestoreInst)
        expect(appren.title).toEqual(APPREN_EDIT_SHALLOW.title)
    })

    it("Should delete an apprenticeship by ID", async () => {
        await deleteAppren(userId, docId, firestoreInst)
        const appren = await getAppren(userId, docId, firestoreInst)
        expect(appren).toEqual({})
    })
}) 
