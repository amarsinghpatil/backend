import express from "express"
import cors from "cors" // Middleware
import cookieParser from "cookie-parser" //Middleware

const app = express() 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, Limit: "16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())


// routes import
import userRouter from './routes/user.routes.js' 

//routes declaration

app.use('/api/v1/user', userRouter)

/* 

when an User types an /user it route to /User. then userRouter take an control
then it is directed to user.routes which routes to register, call an register method

So it depend upon an user request if an request is an http://localhost:8000/api/v1/user/register then 
Routed to register method. her how url is build is Described

login Methods 
This is an Good practices

*/




export { app } // default express