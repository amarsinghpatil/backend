
    import dotenv from "dotenv"
    import connectDB from "./db/index.js";
    import {app} from './app.js'

    dotenv.config({ 
        path: './env'
    })

connectDB()
 
/*
 This code is written Due to when database connection code was written async method was used and promises are returned

*/

.then(() => {
    
    app.listen(process.env.PORT || 4000, () =>{
    //If an Port was not able identify then use default or use an server port (best Production practice to avoid an server crash)

        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

