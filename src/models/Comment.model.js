import mongoose, { Schema } from "mongoose";


import {User} from './user.model.js'
const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: User,
    },

    commentText: {
      type: String,
      required: true,
    },

    // comparison: {
    //   type: Schema.Types.ObjectId,
    //   ref: comparision,
    // },
    // scientist: {
    //   type: Schema.Types.ObjectId,
    //   ref: Scientist,
    // },
// book: {
    //   type: Schema.Types.ObjectId,
    //   ref: AncientBook,
    // },
  },

  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
