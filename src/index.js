
    import dotenv from "dotenv"
    import connectDB from "./db/index.js"

    dotenv.config({
        path: './env'
    })

connectDB()



// import express from "express"
// const app = express()

// ( async () => {

//     try {

//         // 1. connecting to mongodb
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         // this is how an database is connected with an name given by an DB_NAME
//         // async await is used because of an database is in another contitent


//         // 2. error handling
//         app.on("error", () => {
//             console.log("ERR: ", error);
//             throw error
//         })

//         // 3. starting the server
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err

//         throw error means exit an proess or exit an
//     }

// }) ()
