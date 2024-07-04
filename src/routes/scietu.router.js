import express from 'express';
import { getAllScientists } from '../controllers/Scientist.controller.js';

const router = express.Router();

router.get('/scientists', getAllScientists);

export default router;
