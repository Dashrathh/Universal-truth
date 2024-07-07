import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleare.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route('/register').get((req,res) =>{
  res.render('register');
});

// router.route('/register').post((req,res) =>{
//   res.end('Hello world');
// });
// * Register a new user

router.route('/register').post(registerUser);

// * Login user
router.route("/login").post(loginUser);

// * Logout user
router.route("/logout").post(verifyJWT, logoutUser);


// * Refresh token
router.route("/refresh-token").post();


export default router;
