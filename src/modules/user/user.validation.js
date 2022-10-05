const z = require("zod")

const register = (data) => {
    const Register = z.object({
        email: z.string().email(),
        password: z.string()
    })

    return Register.parse(data)
}

module.exports = {
    register
}

