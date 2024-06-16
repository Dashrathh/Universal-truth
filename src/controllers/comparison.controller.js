import {comparision} from "../models/comparision.model.js"

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// Steps
// 1: get comaprison

const createComparison = asyncHandler(async(req,res) =>{
    const {mordenField ,ancientField, mordenWorkingModel,ancientWorkingModel,compareText,summary} = req.body;
   
    // console.log(mordenField);
    // const Comparison = await comparision.create({mordenField,ancientField,mordenWorkingModel,ancientWorkingModel,compareText,summary})
    //  if(!newComparison){
    //     throw ApiError(400, "Comparison all  failed required ")
    //  } 



  

//   image upload on cloudinary for mordenFiled and Ancient field

 const mordenImageLocalPath = req.files?.mordenImage?.[0]?.path;
 const ancientImageLocalPath = req.files?.ancientImage?.[0]?.path;
 const mordenWorkingImageLocalPath = req.files?.mordenWorkingImage?.[0]?.path;
 const ancientWorkingImageLocalPath = req.files?.ancientWorkingImage?.[0]?.path;


 console.log(mordenImageLocalPath);
 console.log(ancientImageLocalPath);
 console.log(mordenWorkingImageLocalPath);
 console.log("ancientWorkingImageLocalPath");
//   check if 

       if(!mordenImageLocalPath ||!ancientImageLocalPath ||!mordenWorkingImageLocalPath|| !ancientWorkingImageLocalPath){
        throw new ApiError(400, "All image are required")

        
       }

//  upload on cloudinary

const mordenImage = await uploadOnCloudinary(mordenImageLocalPath);
const ancientImage = await uploadOnCloudinary(ancientImageLocalPath);
const mordenWorkingImage= await uploadOnCloudinary(mordenWorkingImageLocalPath);
const ancientWorkingImage = await uploadOnCloudinary(ancientWorkingImageLocalPath);

   console.log(mordenImage);

    if(!mordenImage|| !ancientImage || !mordenWorkingImage || !ancientWorkingImage){
        throw new ApiError(400, " All immage file are required")
    }
    const newComparison = await comparision.create({

        mordenField,
        mordenImage: mordenImage.url,
        ancientField,
        ancientImage:ancientImage.url,
        mordenWorkingModel,
        mordenWorkingImage:mordenWorkingImage.url,
        ancientWorkingModel,
        ancientWorkingImage:ancientWorkingImage.url,
        compareText,
        summary,
        owener: req.user._id,
    
    });
    
    if(!newComparison){
     
        throw new ApiError(400 ,"comparison creation failed")
    }
return res.status(201).json(ApiResponse(200),newComparison,"Compari creat successfully");


})

//  Entry in db



//   get all comparison

const getAllComparisons = asyncHandler(async(req,res) =>{
    const comaprison = await comparision.find();
    
    if(!comaprison){
        throw ApiError(500 ,"Comparison not found")
    }

    return res(200).json(ApiResponse(200),comaprison, "Comparison find successfully !")
});

// 3:  get comparison by ID

   const getComparisonById =  asyncHandler(async(req,res) =>{
     const{comparisionId} = req.params
     const comaprison = await comparision.findById(comparisionId);

     if(!comaprison){
        throw ApiError(400, "comparion not found")
     }

     return res.status(200).json(ApiResponse(200),comaprison ,"single comparion found successfully")
   });
 




// 4. Update Comparison by ID

const updateComparisonById = asyncHandler(async (req, res) => {
    const { comparisonId } = req.params;
    const { 
        mordenField, 
        ancientField, 
        mordenWorkingModel, 
        ancientWorkingModel, 
        compareText, 
        summary 
    } = req.body;

    const files = req.files;

    const updatedData = { mordenField, ancientField, mordenWorkingModel, ancientWorkingModel, compareText, summary };

    // If there are new images to update, upload them to Cloudinary and add their URLs to the updatedData object
    if (mordenImageLocalPath) {
        const mordenImage = await uploadOnCloudinary(files.mordenImage[0].path);
        updatedData.mordenImage = mordenImage.url;
    }
    if (ancientImageLocalPath) {
        const ancientImage = await uploadOnCloudinary(files.ancientImage[0].path);
        updatedData.ancientImage = ancientImage.url;
    }
    if (mordenWorkingImageLocalPath) {
        const mordenWorkingImage = await uploadOnCloudinary(files.mordenWorkingImage[0].path);
        updatedData.mordenWorkingImage = mordenWorkingImage.url;
    }
    if (ancientImageLocalPath) {
        const ancientWorkingImage = await uploadOnCloudinary(files.ancientWorkingImage[0].path);
        updatedData.ancientWorkingImage = ancientWorkingImage.url;
    }

    const updatedComparison = await comparision.findByIdAndUpdate(comparisonId, updatedData, { new: true });

    if (!updatedComparison) {
        throw new ApiError(400, "Comparison update failed");
    }

    return res.status(200).json(ApiResponse(200, updatedComparison, "Comparison updated successfully"));
}); 


    //     delete comparison

    const deleteCompariosn = asyncHandler(async(req,res) =>{
        const {comparisionId} = req.params
        const deletedComparison = comparision.findByIdAndDelete(comparisionId)

        if(!deleteCompariosn){
            throw new ApiError(400, "delete comparison failed")
        }

        return res.status(200).json(new ApiResponse(200),deleteCompariosn,"Comparison deleted successfully")
    })

export{
    createComparison,
    getAllComparisons,
    getComparisonById,
    updateComparisonById,
    deleteCompariosn
};

