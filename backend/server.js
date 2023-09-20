import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './db.js'
dotenv.config()


const app = express()

const port = process.env.PORT || 8000



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("Connected to DB..."))
        app.listen(port, () => console.log(`listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
