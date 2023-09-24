import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './db.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()

const port = process.env.PORT || 8000

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow credentials (cookies, HTTP authentication)
    })
);
app.use(express.json())
app.use(cookieParser())
app.use("/api", userRoutes)
app.use("/auth", authRoutes)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    })
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("Connected to DB..."))
        app.listen(port, () => console.log(`listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
