const serviceAccount = require("../../config/firebase-admin-keys.json")
const firebaseTesting = require("@firebase/rules-unit-testing")
const firebaseConfig = require("../../../firebase.json")
const { createAppren } = require("./appren.services")

// TODO: move all dummy data to a file
const data = {
    "title": "Apprenticeship 2022",
    "company_logo": "https://aws.bucket.com/123",
    "appren_desc": "This is a long description for our great apprenticeship, we are doing blah blah ...",
    "company_desc": "In our company XYZ, we care about blah blah, ...",
    "intro_vid": "https://aws.bucket.com/321",
    "timeline": {
        "start_date": "10/3/2022",
        "end_date": "12/3/2022"
    },
    "team_type": "Web Devs",
    "team_roles": [{
        "title": "Backend Dev",
        "role_desc": "Looking for a backend guy to handle our shitty backend!",
        "required_skills": ["NodeJS", "Java", "Python", "PingPong and Pool Tables"],
        "comp_skills": ["Git", "Something you never heard of before!"],
        "min_hours": 20,
        "role_location": "US California 2345 ST-34"    
    }],
    "team_admins": [{
        "name": "John Doe",
        "email": "valid@email.com",
        "img": "https://fb.com/profile1/someimg.img",
        "social_url": "https://linkedIn.com/profile1/"
    },
    {
        "name": "Mike Alen",
        "email": "valid@email1.com",
        "img": "https://fb.com/profile2/someimg.img",
        "social_url": "https://linkedIn.com/profile2/"
    }]
}

describe("Apprenticeship UTs: ", () => {
    let firestoreInst 
    let fbt // firebase instance
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
        const userId = "123"
        const appren = await createAppren(userId, data, firestoreInst)

        expect(appren.id).toBeTruthy()
    })
}) 
