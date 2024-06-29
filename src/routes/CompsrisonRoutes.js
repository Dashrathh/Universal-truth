import {
  createComparison,
  getAllComparisons,
  getComparisonById,
  updateComparisonById,
  deleteCompariosn,
} from "../controllers/comparisonController.js";
import { upload } from "../middlewares/multer.middleare.js";
import router from "../routes/user.routes.js";

// * creat new camparion router
router.route("/createComparison").post(
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
router.route("/").get(getAllComparisons);

// * route upadate comparion
router.route("/:comparisonId").put(
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
router.route("/comparison/:comparisonId").get(getComparisonById);

// * Route to delete a comparison by id
router.route("/:comparisonId").delete(deleteCompariosn);

// * Route to get a comparison by id
router.route("/", getComparisonById);

export default router;