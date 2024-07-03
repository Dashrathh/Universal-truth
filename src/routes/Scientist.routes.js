

// import { Router } from "express"
import { Router } from "express";
import {  createScientist,
  getAllScientists,
  updateScientist,
  deleteScientist
 } from "../controllers/Scientist.controller.js"

 import { upload } from "../middlewares/multer.middleare.js"



const scientist = Router();
scientist.route ('/create').post(
    upload.fields([

      {
        name: "ScientistImage",
        maxCount: 1
      },
      {
        name: "workingImage",
        maxCount: 1
      },
      {name: "achivementImage",
        maxCount: 1
      },
      {name: "evidenceImage",
        maxCount: 1
      }
    ]),
    createScientist)


scientist.route('/list').get(getAllScientists)

scientist.route('/scientistId').put(updateScientist)

scientist.route('/:scientistId').delete(deleteScientist)

export default scientist;
