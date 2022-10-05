const firebaseAdmin = require("../../utils/firebaseAdmin.js")

const createUser = async (data) => {
    const user = await firebaseAdmin.auth().createUser({
        email: data.email,
        password: data.password,
        disabled: false
    })

    return user
}

module.exports = {
    createUser
}
