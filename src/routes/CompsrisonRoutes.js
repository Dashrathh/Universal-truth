
import express from "express";

import {
  createComparison,
  getAllComparisons,
  getComparisonById,
  updateComparisonById,
  deleteCompariosn,
} from "../controllers/comparisonController.js";
import { upload } from "../middlewares/multer.middleare.js";
import router from "../routes/user.routes.js";

const compare = express.Router(); 


// * creat new camparion router
compare.route("/createComparison").post(
  upload.fields([
    {
      name: "mordenImage",
      maxCount: 1,
    },
    {
      name: "ancientImage",
      maxCount: 1,
    },
    {
      name: "mordenWorkingImage",
      maxCount: 1,
    },
    {
      name: "ancientWorkingImage",
      maxCount: 1,
    },
  ]),
  createComparison
);

// * route to get all comparison
compare.route("/").get(getAllComparisons);

// * route upadate comparion
compare.route("/:comparisonId").put(
  upload.fields([
    {
      name: "mordenImage",
      maxCount: 1,
    },
    {
      name: "ancientImage",
      maxCount: 1,
    },
    {
      name: "mordenWorkingImage",
      maxCount: 1,
    },
    {
      name: "ancientWorkingImage",
      maxCount: 1,
    },
  ]),
  updateComparisonById
);

// * Route to delete a comparison by id
compare.route('/list/:id').get(getComparisonById);

// * Route to delete a comparison by id
compare.route("/:comparisonId").delete(deleteCompariosn);

// * Route to get a comparison by id
// compare.route("/", getComparisonById);

export default compare;