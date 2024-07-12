
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { Router } from "express"
import { Router } from "express";
import {
  createScientist,
  // getAllScientists,
  updateScientist,
  deleteScientist,
  getSingleScientist,
  scientistComment,
  getComment

  
  

} from "../controllers/Scientist.controller.js"

import { upload } from "../middlewares/multer.middleare.js"
import router from "./user.routes.js";


router.use(verifyJWT)

const scientist = Router();

scientist.route('/create').post(
  upload.fields([
    {
      name:'ScientistImage',
      maxCount: 1
    },
    {
      name:'workingImage',
      maxCount: 1
    },
    {
      name:'achivementImage',
      maxCount: 1
    },
    {
      name: 'evidenceImage',
      maxCount: 1
    },
    { name: 'evidence', maxCount: 10 }
  ]),
  createScientist
);
// scientist.route('/list').get(getAllScientists)
scientist.route('/:id').get(getSingleScientist)

scientist.route('/scientistId').put(updateScientist)

scientist.route('/:scientistId').delete(deleteScientist)

scientist.route('/:scientistId/comment').post(scientistComment)
scientist.route('/scientistId/:id').get(getComment)




export default scientist;
