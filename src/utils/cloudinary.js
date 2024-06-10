import {v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { response } from "express";

//  clodinary configuration


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});


const url = cloudinary.url("olympic_flag" , {
    width: 100,
    height:150,
    crop: 'fill'
});

const uploadOnCloudinary = async (localFilePath) =>{

    try {
        if(!localFilePath) return null;
       
         // Upload the file cloudinary
       
         const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
         });
          
         // File has been upload successfully

         console.log("File is upload on cloudinary:" , response.url);
 
          fs.unlinkSync(localFilePath);
         return response;
    

    } catch (error) {
        // Hadle error and clean up local file

        console.log(error);
           fs.unlinkSync(localFilePath)
           return response;
    }
}

console.log("URL:" , url );

export {uploadOnCloudinary };
