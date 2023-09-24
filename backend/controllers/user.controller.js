import User from "../models/user.model.js"
import errorHandler from "../utils/customError.js"
import bcryptjs from 'bcryptjs'

const test = (req, res) => {
    res.send("hello")
}

const updateUser = async (req, res, next) => {

    // console.log(req.body);

    if (req.user.id != req.params.id) {
        return next(errorHandler(401, 'Only the owner of the account can update data!'))
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.formData.username,
            email: req.body.formData.email,
            password: req.body.formData.password,
            profilePicture: req.body.formData.profilePicture
        }, { new: true })


        const { password, ...rest } = updatedUser._doc
        res.status(201).json(rest)
    } catch (error) {
        next(error)
    }
}

export { test, updateUser }