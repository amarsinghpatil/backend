import express from "express"
import cors from "cors" // middleware
import cookieParser from "cookie-parser" //middleware

const app = express() 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, Limit: "16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())

export { app } // default express