
import  {Mongoose, Schema}  from "mongoose";

const BookSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        written_year:{
            type:String,
            required:true
        },
        Ancient_invention:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        Bookrefer:[
            {
                type:{
                    type:String, // Typw of evidence, e.g., "photo"
                    required:true
                },

                url:{
                    type:String,  // url path to the photot
                    required: true
                },
                description:{
                    type:String,
                    required:false
                }
            }
        ]
    },
    {
        timestamps:true
    }
);

export const  AncientBook = Mongoose.model("AncientBook",BookSchema)