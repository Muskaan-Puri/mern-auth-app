import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './db.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()


const app = express()

const port = process.env.PORT || 8000

app.use(express.json())
app.use("/", userRoutes)
app.use("/auth", authRoutes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("Connected to DB..."))
        app.listen(port, () => console.log(`listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
