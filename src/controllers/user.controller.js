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
    const { fullName, email, username, password } = req.body
    console.log('Email:', email)
    console.log('FullName',fullName )

   // 2. validation - not empty -> done
    if ([fullName, email, username, password].some((field)=>
        field.trim() === ''))
    {
        throw new ApiError(400, "All fields are required")
    }

    // 3. check if user already exists : username, email
    const exitedUser = User.findOne({// This User is of mongoose Intereating with an mongodb calling as much as possible
        $or:[{username},{email}] // Calling user database and checking given username and email match with preexiting database
        // checking inside object, return if exited user is present in database then return an error
    })

    if (exitedUser) { // 
        throw new ApiError (409, "User with email or username already exits")
        // here apierror is invoked which return an object, 409 error is used it an user error
        // 
    }
    
    // 4. checking an images and avatar
    const avatarlocalpath = req.files?.avatar[0]?.path; // looking for avatar in given Path. may get may not get
    const coverimagelocalpath = req.files?.coverImage[0]?.path; // looking for cover Image in given Path, may get may not get

    if(!avatarlocalpath){
        throw new ApiError(400, "Avatar is required")// if localpath is not available then throw error
    }

    //5. upload them to cloudinary(avatar and coverImage )
    const avatar = await uploadOnCloudinary(avatarlocalpath, 'avatar') // upload avatar
    const coverImage = await uploadOnCloudinary(coverimagelocalpath, 'coverImage') // upload coverImage

    // checking if avatar is uploaded in cloudinary or not
    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    //6.create user object in database
    const user = await User.create({
        fullName,
        avatar: avatar.url, // before creating  check avatar url available or not
        coverImage: coverImage?.url || "", // before creating coverimage check coverimage.url is available or not
        email,
        password,
        username: username.toLowerCase()

    }) 

    //checking if user created ? or it returned an empty
    const createdUser = await User.findById(user._id).select("-password -refreshToken") 
    // by using this _id can check user was created, ifnot available then error can be given
    // when an response wanted to received don't include password and refreshToken
   
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