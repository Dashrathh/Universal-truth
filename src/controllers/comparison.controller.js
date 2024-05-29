import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { comparision, comparision } from "../models/comparision.model.js";


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

     

    const comparision  = new comparision({
        mordenField,
        ancientField,
        compareText,
        summary
    });

    await comparision
// 
}) 