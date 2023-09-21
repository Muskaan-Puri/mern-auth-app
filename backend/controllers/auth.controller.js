import User from "../models/user.model.js"
import bycryptjs from 'bcryptjs'
import errorHandler from '../utils/customError.js'
import jwt from "jsonwebtoken"

const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const hashedPassword = bycryptjs.hashSync(password, 10)
        const newUser = await User.create({ username, email, password: hashedPassword })
        return res.json({ newUser })
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(401, 'User not found!'))
        }
        const validPassword = bycryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid credentials!'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export { signup, signin }