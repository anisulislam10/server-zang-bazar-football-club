import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SliderImage = mongoose.model("SliderImage", sliderImageSchema);
export default SliderImage;
