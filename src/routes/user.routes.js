import { Router } from 'express';
import {loginUser,logoutUser,registerUser} from "../controllers/user.controllers.js"
import { upload } from '../middlewares/multer.middleare.js';

import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()


// Example route using the upload middleware

router.route("/register").post(


upload.fields([
  {
    name:"avatar" ,
    maxCount:1
  },

  {
    name: "coverImage",
    maxCount:1
  },

]),
    registerUser)
    router.route("/login").post(loginUser)

    router.route("/logout").post(verifyJWT,logoutUser)

    // here router are do route method with use post (logout) .(verifying middleware before logout)
    
    router.route("/refresh-token").post()

    export default router