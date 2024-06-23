import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { response } from "express";
// import { AncientBook } from "../models/Book.model.js";

// Create access and refresh token generator function

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    console.log(refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Something went wrong");
  }
};

//================ Register user===============

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  // Validation - not empty

  if (
    [fullname, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists: username, email

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // step 3:  Check for images, check for avatar

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage[0]?.path
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // Check if avatar file exists

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload them to cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  console.log(avatar);
  // Check if avatar upload failed

  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  // Create user object - create entry in db

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // accessToken and refreshToken call back

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  // Check for user creation

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return response

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// ============================Login user===================================================

const loginUser = asyncHandler(async (req, res) => {
  // get from data req.body

  const { email, username, password } = req.body;

  // Login with username or email

  if ((!username && !email) || !password) {
    throw new ApiError(400, "Username or email and password are required");
  }

  // User login and registration check

  // find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // 4 password check

  const isPasswordValid = await user.isPasswordCorrect(password);

  // console.log(isPasswordCorrect);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // 5: Access and refresh token generation

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

// Logout user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },

    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// refreshToken  and accessToken endPoint

//  const refrehAccessToken = asyncHandler(async(req,res) =>{
//   {

//     const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken
//   }
//  })

export { registerUser, loginUser, logoutUser };
