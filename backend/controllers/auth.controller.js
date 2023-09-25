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

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            const { password: hashedPassword, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bycryptjs.hashSync(generatedPassword, 10)
            const newUser = await User.create({ username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), email: req.body.email, password: hashedPassword, profilePicture: req.body.photo })


            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: hashedPassword2, ...rest } = newUser._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}

const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('Signout success!')
    } catch (error) {
        console.log(error)
    }
}

export { signup, signin, google, signout }