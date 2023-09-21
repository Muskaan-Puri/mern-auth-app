import User from "../models/user.model.js"
import bycryptjs from 'bcryptjs'

const signup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = bycryptjs.hashSync(password, 10)
        const newUser = await User.create({ username, email, password: hashedPassword })
        return res.json({ newUser })
    } catch (error) {
        console.log(error)
    }
}

export { signup }