const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}
 
export {asyncHandler}

/*

*/ 

// const asyncHandler = (fn) => async (req, res, next) 
// => {
//     try  {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

/*
While running webapp , you will be much interactng with database, so always
 you dont have to write asyn try and catch again and again for commanly Interacting with an database. so in Utilis you have
 to make an File Named asynhandler.js. what does that do is that ,method created and function is passed into it
 and exported.

 So an Function is passed which has an argument, when the fucntion is executed result is wrapped
 in promises, when an error is accour that is passed to next() which will trigger an error handling middleware(function)

 Async Handler function <---> Database Connection
*/ 