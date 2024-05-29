import mongoose, { Schema } from "mongoose";


const CamparisonSchema = new Schema(
    
    {
        mordenField:{
            type: String,
            require: true
        },
        ancientField:{
            type: String,
            require: true
        },
         compareText:{
              type:String,
              require:true
         },
         summary:{
          type:String,
          require:true
         },
        },

         {
            timestamps:true
         }

)

export const comparision = mongoose.model("comparision",CamparisonSchema)