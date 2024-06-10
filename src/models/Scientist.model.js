
import mongoose ,{Schema, Types}  from "mongoose"

const ScientistSchema = new Schema(
    
    
    {

    
        name:{
            type: String,
            required:true
        },

        birth_year:{
            type:Number,
            required: true
        },
        death_year:{
            type:Number,
        
        },
        personalLife:{
            type:String,
            required:true
        },

        their_work:{
            type:String,
            required:true
        },
        achivement:{
            type:String,
            required:false
        },
        achivementImage:{
            type:String,
            required:true
        },

         evidence:[
            {
                type:{
                    type:String, // Typw of evidence, e.g., "photo"
                    require:true
                },

                url:{
                    type:String,  // url path to the photot
                    require: true
                },
                description:{
                    type:String,
                    require:false
                }
            }
         ]
         ,
         created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
        
           
    },
    {
        timestamps:true

    });


    export const Scientist = mongoose.model('Scientist' ,ScientistSchema)