import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler( async (req, res) => {

    //get user details from frontend -> done
    // validation - not empty -> done
    // check if user already exists : username, email --> done
    // check for immages and avatar --> done
    // upload them to cloudinary --> done
    //create user object - create in db -->
    //remove password and refresh token field
    // check for user creation
    // return an response

   // 1. get user details from frontend
    const { fullname, email, username, password } = req.body
    console.log('Email:', email)
    console.log('FullName',fullname )

   // 2. validation - not empty -> done
    if ([fullname, email, username, password].some((field)=>
        field.trim() === ''))
    {
        throw new ApiError(400, "All fields are required")
    }

    // 3. check if user already exists : username, email
    const exitedUser = await User.findOne({// This User is of mongoose Intereating with an mongodb calling as much as possible
        $or:[{username},{email}] // Calling user database and checking given username and email match with preexiting database
        // checking inside object, return if exited user is present in database or return an error
       
    })

    if (exitedUser) { // 
        throw new ApiError (409, "User with email or username already exits")
        // here apierror is invoked which return an object, 409 error is used it an user error
        // it check in database that user is available or not  if available then return error
    }

    // 4. checking an images and avatar

    const avatarlocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarlocalpath) {
      throw new ApiError(400, "Avatar file is required")
      //check avatar file is available in localstorage
    }

    // uploading avatar and coverimage to cloudinary
    const avatar = await uploadOnCloudinary(avatarlocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(400, "Avatar file is required")
    }

    //6.create user object in database
    const user = await User.create({
        fullname,
        avatar: avatar.url, // before creating  check avatar url available or not
        coverImage: coverImage?.url || "", // before creating coverimage check coverimage.url is available or not
        email,
        password,
        username: username.toLowerCase()
    }) 
       // console.log(user)

    //checking if user created ? or it returned an empty
    const createdUser = await User.findById(user._id).select("-password -refreshToken") 
    // by using this _id can check user was created, if not available then error can be given
    // when an response wanted to received don't include password and refreshToken have mentioned in above code by -
    // response will be in json (object)
   
    //console.log(createdUser)
    if(!createdUser){
        throw new ApiError(500, "Failed to create user while registering user")
    }

    // User is not found in database then give an error failed to create user

    //7. if user is created in database then response back it, here Api response is used
    // now already Apiresponse class is used her

    //  
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    
})             

export {registerUser}

/*
Taking an data from postman and uploading on cloudinary and Mongodb

 const avatarlocalpath = req.files?.avatar[0]?.path; // looking for avatar in given Path. may get may not get
    const coverimagelocalpath = req.files?.coverImage[0]?.path; // looking for cover Image in given Path, may get may not get
    console.log(avatarlocalpath);
    console.log(coverimagelocalpath)

    if(!avatarlocalpath){
        throw new ApiError(400, "Avatar is required")// if localpath is not available then throw error
    }

    //5. upload them to cloudinary(avatar and coverImage )
    // Needed am URl
    const avatar = await uploadOnCloudinary(avatarlocalpath, 'avatar') // upload avatar
    const coverImage = await uploadOnCloudinary(coverimagelocalpath, 'coverImage') // upload coverImage
    console.log(avatar)
    console.log(coverImage)

    // checking if avatar is uploaded in cloudinary or not
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }



*/