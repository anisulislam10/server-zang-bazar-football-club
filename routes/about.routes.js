import express from 'express';
import {
  createAbout,
  getAllAbout,
  getAboutById,
  updateAbout,
  deleteAbout
} from '../controllers/about.controller.js';
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post('/post', upload.single("aboutUsImage"), createAbout);

router.get('/getAll', getAllAbout);

router.get('/get/:id', getAboutById);

router.put('/update/:id',  upload.single("aboutUsImage"), updateAbout);

router.delete('/delete/:id', deleteAbout);

export default router;