import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true

    // cloudnary configuration tells about an file uploading

});

const uploadOnCloudinary = async (localFilePath) => {

    try {
        if (localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded Successfull
        console.log('file is uploaded on cloudinary',response.url);
       // return response;
      //  fs.unlinkSync(localFilePath)
        return response;
        
// how to remove file uploaded by an multer

    } catch (error) {
       // fs.unlinkSync(localFilePath) 
        //remove the locally saved temporary file as the upload Operation got failed
        console.log('File is not uploaded '); 
        
        return null;
    }

}

export { uploadOnCloudinary }




