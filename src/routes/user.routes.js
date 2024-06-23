import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleare.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// * Register a new user
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },

    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

// * Login user
router.route("/login").post(loginUser);

// * Logout user
router.route("/logout").post(verifyJWT, logoutUser);

// * Refresh token
router.route("/refresh-token").post();

export default router;
