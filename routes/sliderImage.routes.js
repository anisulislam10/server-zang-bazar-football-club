import express from "express";
import {
  getSliderImages,
  getSliderImageById,
  addSliderImage,
  updateSliderImage,
  deleteSliderImage,
} from "../controllers/sliderImage.controller.js";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();
router.post("/add", upload.single("imageUrl"),addSliderImage);

router.get("/get", getSliderImages);
router.get("/get/:id", getSliderImageById);
router.put("/update/:id", upload.single("imageUrl"), updateSliderImage);
router.delete("/delete/:id", deleteSliderImage);

export default router;
