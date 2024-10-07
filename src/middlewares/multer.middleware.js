import multer from 'multer';
//const path = require('path');

// The storage object is created using multer.diskStorage(). 
//This object defines the rules for storing uploaded files.

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter // Optional: Filter uploaded files (explained later)
//   });

const storage = multer.diskStorage({
    // Destination for uploaded files
    destination: function (req, file, cb) {
        cb(null, './public/Temp')
    },


    // This function determines the name of the uploaded file. 
    // Here, the original filename from the uploaded file is used.
    filename: function (req, file, cb) {
        cb(null, file.originalname )
       
        
    }

   
})
 

export const upload = multer({ storage: storage });