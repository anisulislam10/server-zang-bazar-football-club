import express from 'express';
import { 
  create, 
  getGalleryImages, 
  getImageById, 
  updateImage, 
  deleteImage, 
  countImages 
} from '../controllers/gallery.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();


router.post('/post', upload.single('image'), create);

router.get('/getAll', getGalleryImages);

router.get('/get/:id', getImageById);

router.put('/update/:id', upload.single('image'), updateImage);

router.delete('/delete/:id', deleteImage);

router.get('/count/images', countImages);

export default router;