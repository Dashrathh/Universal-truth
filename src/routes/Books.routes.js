import express from 'express';
import { 
    creatBook, 
    getBookById, 
    UpdateBook, 
    deleteBook 
} from "../controllers/Book.controller.js";
import { upload } from '../middlewares/multer.middleare.js' 

const router = express.Router();

router.route('/create').post(
    upload.fields([
        { name: "BookImage", maxCount: 1 },
        { name: "Ancient_inventionImage", maxCount: 1 },
        { name: "Images", maxCount: 1 }
    ]),
    creatBook
);

router.route('/list/:BookId').get(getBookById); 

router.route('/update/:BookId').put(UpdateBook);
 
router.route('/delete/:BookId').delete(deleteBook); 

export default router;
