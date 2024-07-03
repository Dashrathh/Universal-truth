import { Scientist } from "../models/Scientist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create a new scientist
const createScientist = asyncHandler(async (req, res) => {
    const {
        name,
        birth_year,
        death_year,
        personalLife,
        their_work,
        achivement,
        evidence
    } = req.body;

    const ScientistImageLocalPath = req.files?.ScientistImage?.[0]?.path;
    const achivementImageLocalPath = req.files?.achivementImage?.[0]?.path;
    const evidenceImageLocalPath = req.files?.evidenceImage?.[0]?.path;
    const workingImageLocalPath = req.files?.workingImage?.[0]?.path;

    if (!ScientistImageLocalPath || !achivementImageLocalPath || !evidenceImageLocalPath ||!workingImageLocalPath) {
        throw new ApiError(400, "All images are required");
    }

    console.log(ScientistImageLocalPath);
    
    // Upload images to Cloudinary

    const ScientistImage = await uploadOnCloudinary(ScientistImageLocalPath);
    const achivementImage = await uploadOnCloudinary(achivementImageLocalPath);
    const evidenceImage = await uploadOnCloudinary(evidenceImageLocalPath)
    const workingImage = await uploadOnCloudinary(workingImageLocalPath)


if(!ScientistImage||achivementImage ||evidenceImage||workingImage){
    throw new ApiError(400,"image upload failed")
}
(console.error());

    const newScientist = await Scientist.create({
        name,
        birth_year,
        death_year,
        personalLife,
        their_work,
        achivement,
        evidence,
        ScientistImage: ScientistImage.url,
        achivementImage: achivementImage.url,
        evidenceImage: evidenceImage.url,
        workingImage: workingImage.url
    });

    return res.status(200).json(new ApiResponse(200, "Scientist created successfully", newScientist));
});

// Get all scientist
const getAllScientists = asyncHandler(async (req, res) => {
    const scientists = await Scientist.find();
    return res.status(200).json(new ApiResponse(200, "All scientists data fetched", scientists));
});

// Update a scientist
const updateScientist = asyncHandler(async (req, res) => {
    const { scientistId } = req.params;

    const updatedScientist = await Scientist.findByIdAndUpdate(scientistId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedScientist) {
        throw new ApiError(400, "Scientist not found");
    }

    return res.status(200).json(new ApiResponse(200, "Scientist updated successfully", updatedScientist));
});

// Delete a scientist
const deleteScientist = asyncHandler(async (req, res) => {
    const { scientistId } = req.params;
    const deletedScientist = await Scientist.findByIdAndDelete(scientistId);

    if (!deletedScientist) {
        throw new ApiError(400, "Failed to delete scientist");
    }

    return res.status(200).json(new ApiResponse(200, "Scientist deleted successfully", deletedScientist));
});


export {
    createScientist,
    getAllScientists,
    updateScientist,
    deleteScientist
};
