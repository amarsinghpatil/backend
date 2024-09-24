import { Router } from "express";

// import an router class from an express module, it provide an ways to define routes and 
// handle HTTP requests

import { registerUser } from '../controllers/user.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()
//  routes apps is defined now this is imported in app.js

router.route('/register').post(

// For Many File Upoad field is used, that accept an array 
// before excuting registeruser Method middleware is injected

    upload.fields([
        {
            name: "avatar",
            maxCount:1
        },

        {
            name:" coverImage",  //Two files are uploading so two object are Created
            maxCount: 1
        }

    ]),registerUser)

// this is a route for register user, it will call the registerUser function when the user send request
// by http:localhost:8000/User/register

/*

If an user request localhost:8000/users/login then here login function/methods is invoked
In layman when user is try to access localhost:8000/user/register its an request passed to ----> sever
which is listening at an port 8000. then server passes the request to ------> routes, which then call  methods or
function, it then direct to ----->  controller. it give an response.

*/

export default router

