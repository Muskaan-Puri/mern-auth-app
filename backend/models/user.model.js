import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/male-silhouette-neon-light-icon-gentlemen-wc-door-glowing-sign-men-s-clothes-department-store-vector-isolated-illustration-isolated-brick-wall_549897-229.jpg?w=360'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User