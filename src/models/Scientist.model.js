
import mongoose ,{Schema, Types}  from "mongoose"

const ScientistSchema = new Schema(
    
    
    {

    
        name:{
            type: String,
            require:true
        },

        birth_year:{
            type:Number,
            require: true
        },
        death_year:{
            type:Number,
            require:true
        },
        thetheir_work:{
            type:String,
            require:true
        },
        achivement:{
            type:String,
            require:false
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