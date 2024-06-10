import { Router } from "express";

import {
    createComparison,
    getAllComparisons,
    getComparisonById,
    updateComparisonById,
    deleteCompariosn
} from "../controllers/comparison.controller.js";

import { upload } from "../middlewares/multer.middleare.js"


 import userRouter from "../routes/user.routes.js"
import router from "../routes/user.routes.js";

// const ro = router();

//  creat new camparion router
router.route("/comparison")
    .post(upload.fields([
        {
            name: "mordenImage",
            maxCount: 1
        },
        {
            name: "ancientImage",
            maxCount: 1
        },
        {
            name: "mordenWorkingImage",
            maxCount: 1
        },
        {
            name: "ancientWorkingImage",
            maxCount: 1
        },

    ]), createComparison);

//  route to get all comparison

router.route("/")
    .get(getAllComparisons);

// route upadate comparion 

router.route("/:comparisonId")
    .put(upload.fields([
        {
            name: "mordenImage",
            maxCount: 1
        },
        {
            name: "ancientImage",
            maxCount: 1
        },
        {
            name: "mordenWorkingImage",
            maxCount: 1
        },
        {
            name: "ancientWorkingImage",
            maxCount: 1
        }
    ]), updateComparisonById)

//    Route to delete a comparison by id

router.route("/:comparisonId")
    .delete(deleteCompariosn)

export default router
