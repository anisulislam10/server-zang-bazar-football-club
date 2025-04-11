import SliderImage from "../models/sliderImage.models.js";

// Get all slider images
export const getSliderImages = async (req, res) => {
  try {
    const images = await SliderImage.find();
    res.status(200).json({ statusCode: 200, images });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slider images", error });
  }
};

// Get slider image by ID
export const getSliderImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await SliderImage.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Slider image not found" });
    }
    res.status(200).json({ statusCode: 200, image });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slider image", error });
  }
};

// Add a new slider image (Handles file upload)
export const addSliderImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = new SliderImage({
      imageUrl: `/uploads/${req.file.filename}`, 
    });

    await newImage.save();
    res.status(201).json({ statusCode: 201, message: "Image uploaded successfully", newImage });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

// Update an existing slider image
export const updateSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedImage = await SliderImage.findByIdAndUpdate(id, { imageUrl }, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({ statusCode: 200, message: "Image updated successfully", updatedImage });
  } catch (error) {
    res.status(500).json({ message: "Error updating image", error });
  }
};

// Delete a slider image
export const deleteSliderImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await SliderImage.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Slider image not found" });
    }

    res.status(200).json({ statusCode: 200, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
};
