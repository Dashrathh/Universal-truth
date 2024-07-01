import { comparision } from "../models/comparision.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// * 1: get comaprison
const createComparison = asyncHandler(async (req, res) => {
  const {
    mordenField,
    ancientField,
    mordenWorkingModel,
    ancientWorkingModel,
    compareText,
    summary,
  } = req.body;

  //   image upload on cloudinary for mordenFiled and Ancient field

  const mordenImageLocalPath = req.files?.mordenImage?.[0]?.path;
  const ancientImageLocalPath = req.files?.ancientImage?.[0]?.path;
  const mordenWorkingImageLocalPath = req.files?.mordenWorkingImage?.[0]?.path;
  const ancientWorkingImageLocalPath =
    req.files?.ancientWorkingImage?.[0]?.path;

  console.log(mordenImageLocalPath);
  console.log(ancientImageLocalPath);
  console.log(mordenWorkingImageLocalPath);
  console.log(ancientWorkingImageLocalPath);

  if (
    !mordenImageLocalPath ||
    !ancientImageLocalPath ||
    !mordenWorkingImageLocalPath ||
    !ancientWorkingImageLocalPath
  ) {
    throw new ApiError(400, "All image are required");
  }

  //  upload on cloudinary
  const mordenImage = await uploadOnCloudinary(mordenImageLocalPath);
  const ancientImage = await uploadOnCloudinary(ancientImageLocalPath);
  const mordenWorkingImage = await uploadOnCloudinary(
    mordenWorkingImageLocalPath
  );
  const ancientWorkingImage = await uploadOnCloudinary(
    ancientWorkingImageLocalPath
  );

  if (
    !mordenImage ||
    !ancientImage ||
    !mordenWorkingImage ||
    !ancientWorkingImage
  ) {
    throw new ApiError(400, " All immage file are required");
  }
  const newComparison = await comparision.create({
    mordenField,
    mordenImage: mordenImage.url,
    ancientField,
    ancientImage: ancientImage.url,
    mordenWorkingModel,
    mordenWorkingImage: mordenWorkingImage.url,
    ancientWorkingModel,
    ancientWorkingImage: ancientWorkingImage.url,
    compareText,
    summary,
    owener: req.userid,
  });

  return res
    .status(200)
    .json(new ApiResponse(200), createComparison, "All creat successfuly");
});

// * 2: get all comparison
const getAllComparisons = asyncHandler(async (_req, res) => {
  const comaprison = await comparision.find();

  if (!comaprison) {
    throw ApiError(500, "Comparison not found");
  }
  console.log("compu:",comaprison); // Debugging line

  console.log(comaprison);

  res.render("createComparison", {
    comaprison,
    message: "Comparisons found successfully",
  });

});

// * 3: get comparison by ID
const getComparisonById = asyncHandler(async (req, res) => {
  const { comparisionId } = req.params;
  const comaprison = await comparision.findById(comparisionId);

  if (!comaprison) {
    throw ApiError(400, "comparion not found");
  }

  res.render("createComparison");
});

// * 4. Update Comparison by ID
const updateComparisonById = asyncHandler(async (req, res) => {
  const { comparisonId } = req.params;
  const {
    mordenField,
    ancientField,
    mordenWorkingModel,
    ancientWorkingModel,
    compareText,
    summary,
  } = req.body;

  const files = req.files;

  const updatedData = {
    mordenField,
    ancientField,
    mordenWorkingModel,
    ancientWorkingModel,
    compareText,
    summary,
  };

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
    const mordenWorkingImage = await uploadOnCloudinary(
      files.mordenWorkingImage[0].path
    );
    updatedData.mordenWorkingImage = mordenWorkingImage.url;
  }
  if (ancientImageLocalPath) {
    const ancientWorkingImage = await uploadOnCloudinary(
      files.ancientWorkingImage[0].path
    );
    updatedData.ancientWorkingImage = ancientWorkingImage.url;
  }

  const updatedComparison = await comparision.findByIdAndUpdate(
    comparisonId,
    updatedData,
    { new: true }
  );

  if (!updatedComparison) {
    throw new ApiError(400, "Comparison update failed");
  }

  res.render("updateComparison", {
    comparison: updatedComparison,
    message: "Comparison updated successfully",
  });
});

// * 5: delete comparison
const deleteCompariosn = asyncHandler(async (req, res) => {
  const { comparisionId } = req.params;
  const deletedComparison = comparision.findByIdAndDelete(comparisionId);

  if (!deletedComparison) {
    throw new ApiError(400, "delete comparison failed");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200),
      deletedComparison,
      "Comparison deleted successfully"
    );
});

export {
  createComparison,
  getAllComparisons,
  getComparisonById,
  updateComparisonById,
  deleteCompariosn,
};