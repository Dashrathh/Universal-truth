

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudinary url
      require: true,
    },
    coverImage: {
      type: String,

    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  });

  // middleware to hash password befor saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)

  next();
});

 
  // Method to check if password is correct

userSchema.methods.isPasswordCorrect = async function (password){
return await bcrypt.compare(password,this.password);
};

 // Method to genete access token

userSchema.methods.generateAccessToken = function () {

  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userSchema: this.fullname,
      fullname: this.fullname
    },

    process.env.ACCESS_TOKEN_SECRET,
    
    {
      expiresIn: process.env.ACCESS_TOKEN_SECRET
    }
  )
}

  
   // Method to generate refresh token

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userSchema: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_SECRET,
    }
  );
};

export const User = mongoose.model("User", userSchema)