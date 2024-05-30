import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {comparision} from "../models/comparision.model.js"
import { response } from "express";


// Step 
// 1: creat comparison
// 2: validation
// 3: get all comparison
// 4: Get Single Comparison
// 5: upadate Comparison
// 6: Delete Comparison
//


// 

const creatComparison = asyncHandler(async (req, res) => {
    
    // 1: creat comparison

    const { mordenField, ancientField, compareText, summary } = req.body

    //    2: validation

    if (!mordenField || !ancientField || !compareText || !summary) {
        throw new ApiError(400, "All field are requred")
    }

    
     
    //  creat new comparison

    const newComparison =  comparision.create({
        mordenField,
        ancientField,
        compareText,
        summary
    });

    return res.status(200).json(new ApiResponse(200),newComparison ,"new comparison creat successfully")
}) 

//  get allComparison

 const getAllcomparison =  asyncHandler(async(req,res) =>{
 
       const comparison  = await comparision.find()
      

       if(!comparision){
        throw new ApiError(400,"comparison not fatcehd successfully")
       }
       return  res.status(200).json(new response(200),comparision,"Fetched all comparison successfully")
 })

          // 4: Get Single Comparison

          const getSingleComparison = asyncHandler(async(req,res) =>{
                 
             const {id} = req.params
             const comparison = await comparision.findById(id);

                if(!comparison){
                    throw ApiError(404,"single Comparison not found")
                }

                return res.status(200).json(new response(200),comparision,"single comparion found successfully");
          })

                      //  upadate Comparison

               const updateDocument = asyncHandler(async(req,res) =>{
                co
               })
 export
   { creatComparison,
    getAllcomparison,
    getSingleComparison
}