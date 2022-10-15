const serviceAccount = require("../../config/firebase-admin-keys.json")
const firebaseTesting = require("@firebase/rules-unit-testing")
const { createUser } = require("./user.services")
const firebaseAdmin = require("../../utils/firebaseAdmin.js")

describe("User UTs: ", () => {
    let users = []
    afterAll(async () => {
        await firebaseAdmin.auth().deleteUsers(users)
    })
    it("Should create a firebase user", async () => {
        const data = {
            email: "test@email.com",
            password: "test123"
        }
        const user = await createUser(data)
        
        // adding uid to the users to be able to delete
        users.push(user.uid)

        expect(user.email).toBe(data.email)
    })

    it("Should not throw an error 'account exists' when using the same registeration info", async () => {
        try {
            const data = {
                email: "test@email.com",
                password: "test123"
            }
            await createUser(data)
        } catch (e) {
            expect(e.message).toBe("The email address is already in use by another account.")
        }
    })
}) 
