import { Scientist } from "../models/Scientist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// import scientist from "../routes/Scientist.routes.js";

// Create a new scientist
const createScientist = asyncHandler(async (req, res) => {

    const {
        name,
        birth_year,
        death_year,
        personalLife,
        their_work,
        achivement,
        cardname,
        contribution

    } = req.body;

    // console.log(req.files);

    // Ensure req.files exist and properly handle files
    const ScientistImageLocalPath = req.files['ScientistImage'] ? req.files['ScientistImage'][0].path : null;
    const workingImageLocalPath = req.files['workingImage'] ? req.files['workingImage'][0].path : null;
    const achivementImageLocalPath = req.files['achivementImage'] ? req.files['achivementImage'][0].path : null;
    const evidenceImageLocalPath = req.files['evidenceImage'] ? req.files['evidenceImage'][0].path : null;
    const evidence = req.files['evidence'] ? req.files['evidence'].map(file => ({
        evidenceImage: 'photo',
        url: file.path,
        description: req.body[`description${file.originalname}`],
    })) : [];

    const ScientistImage = await uploadOnCloudinary(ScientistImageLocalPath);
    const achivementImage = await uploadOnCloudinary(achivementImageLocalPath);
    const evidenceImage = await uploadOnCloudinary(evidenceImageLocalPath);
    const workingImage = await uploadOnCloudinary(workingImageLocalPath);

    // const evidence = await uploadOnCloudinary(evidenceLocalPath)
    // Ensure all required fields are present

if(!ScientistImage){
    throw new ApiError(400, "scientist image upload failed")
};
if(!evidenceImage){
    throw new ApiError(400, "evidence image upload failed")
};




    const newScientist = await Scientist.create(
        {
            name,
            birth_year,
            death_year,
            personalLife,
            ScientistImage: ScientistImage.url,
            their_work,
            workingImage: workingImage.url,
            achivement,
            achivementImage: achivementImage.url,
            evidenceImage: evidenceImage.url,
            evidence,
            cardname,
            contribution

        });

    // console.log(scientist);

    res.status(201).json(new ApiResponse(201, "Scientist created successfully", newScientist));
    if (!newScientist) {
        throw new ApiError(400, "Scientist created failed")
    }

});


// Get all scientists
// const getAllScientists = asyncHandler(async (req, res) => {
//     const scientists = await Scientist.find();
//     res.render('UTindex', { Scientist});

// });

const getSingleScientist = asyncHandler(async (req, res) => {
    const scientist = await Scientist.findById(req.params.id);
    res.render('induvisonItem', { scientist });
    // console.log(scientist);


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
    updateScientist,
    deleteScientist,
    getSingleScientist
};
