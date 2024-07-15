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

    comparisonId: {
      type: Schema.Types.ObjectId,
      ref: "Comparision",
    },

    scientistId: {
      type: Schema.Types.ObjectId,
      ref: "Scientist",
    },

bookId: {
      type: Schema.Types.ObjectId,
      ref: "AncientBook",
  },
  },

  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
