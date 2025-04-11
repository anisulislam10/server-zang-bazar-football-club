import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;