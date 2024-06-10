import mongoose ,{Mongoose, Schema} from "mongoose";
import { trusted } from "mongoose";

const commentSchema = new Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:User
        },
         commentText:{
            type:String,
            required:true
         },


         comparison:{
            type:Schema.Types.ObjectId,
            ref:comparision
         },
         scientist:{
            type:Schema.Types.ObjectId,
            ref:Scientist
         },
         book:{
            type:Schema.Types.ObjectId,
            ref:AncientBook
         }

    },

    {
        timestamps:true
    }
)

export const Comment = Mongoose.model("Comment" , commentSchema)