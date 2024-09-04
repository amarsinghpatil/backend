import multer from 'multer';

// The storage object is created using multer.diskStorage(). 
//This object defines the rules for storing uploaded files.
const storage = multer.diskStorage({
    // Destination for uploaded files
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },

    // This function determines the name of the uploaded file. 
    // Here, the original filename from the uploaded file is used.
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

export const upload = multer({storage,})