import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        
        console.log("MONGODB connection FAILED 1", error);
        process.exit(1)
    }
}

export default connectDB  

/*
 Connecting to the database can take an time, so async is used.

So What is happening here  that, so we are connecting to mongodbAtlas database if an connection is 
Successfull it will display an Message Connected or Connection failed. 
Databse is connected to index.js
but we have to remember  that when an async Method is used the promises are Returned
*/

