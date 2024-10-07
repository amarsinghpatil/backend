import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    // Goal is to Find an user._id
    // 1. search for token in req.cookies (res.cookies has an same )
    // 2. if an token didn't get show an error
    // 3. if token is got then verify does token is right or wrong by using an jwt 
    // 4. if an token is got then store in variable available
    // 5. send an req to database with decoded and with what doesn't want in like an password, refreshtoken
    // 6. req.user is where an fetch data from an database is stored

    // search for an token req.cookies and req.header in mobile phone case if it is available
    // then replace "Bearer" with an empty string ""
    
    try  {

             const token = req.cookies?.accessToken || req.header ("Authorization")?.replace("Bearer", "")

             if(!token ) {
                throw new ApiError(401, "Unauthorized Request")
            }

                 // verify an available token
               const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

                // from decoded search for an user._id
              const user = await User.findById(decoded?._id).select("-password -refreshToken")

            if (!user) {

                  throw new ApiError (401, "Invalid Access Token ")

                 }

    req.user = user;
    next()
}

catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}

})

/*
 How will do an logout of specific user so we needed to clear an cookies ( access token,  refresh token )
 for loggin out we nee

*/
