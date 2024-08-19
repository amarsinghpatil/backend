
    import dotenv from "dotenv"
    import connectDB from "./db/index.js";
    import express from "express"
    const app = express();
   
    dotenv.config({ 
        path: './env'
    })

connectDB()
 
/*
 This code is written Due to when database connection code was written async method was used and somethings it
 return throgh

*/

.then(() => {
    app.on('error', (error) => {
        console.log('Error', (error) => {
            console.log('Error:', error);
            throw error;
        });
    })

    app.listen(process.env.PORT || 8000, () =>{
    //If an Port was not able identify then use default or use an server port (best Production practice to avoid an server crash)

        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})


.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

