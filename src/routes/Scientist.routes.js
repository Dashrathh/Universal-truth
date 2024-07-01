

// import { Router } from "express"
import { Router } from "express";
import { createScientist,
    getAllScientists,
    updateScientist,
    deleteScientist
 } from "../controllers/Scientist.controller.js"

 import { upload } from "../middlewares/multer.middleare.js";
 import router from "./user.routes.js";


const scientist = Router();

scientist.route ('/create').post(createScientist)

scientist.route('/list').get(getAllScientists)

scientist.route('/scientistId').put(updateScientist)

scientist.route('/:scientistId').delete(deleteScientist)

export default scientist;
