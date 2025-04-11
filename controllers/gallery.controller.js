import Gallery from "../models/gallery.model.js";

// 📌 Create new gallery image
export const create = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;

        // Check if image already exists
        const existing = await Gallery.findOne({ image });
        if (existing) {
            return res.status(409).json({ 
                statusCode: 409,
                message: "This image already exists in the gallery" 
            });
        }

        const newImage = await Gallery.create({ image });
        res.status(201).json({ 
            statusCode: 201,
            message: "Image added to gallery successfully", 
            gallery: newImage 
        });

    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Get all gallery images
export const getGalleryImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            statusCode: 200, 
            images
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Get image by ID
export const getImageById = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ 
                statusCode: 404, 
                message: "Image not found" 
            });
        }
        res.status(200).json({ statusCode: 200, image });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Update image (if needed)
export const updateImage = async (req, res) => {
    try {
        const newImage = req.file ? req.file.filename : undefined;

        // Find existing image
        let image = await Gallery.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ 
                statusCode: 404,
                message: "Image not found" 
            });
        }

        // Check if new image already exists
        if (newImage) {
            const duplicateCheck = await Gallery.findOne({ 
                image: newImage,
                _id: { $ne: req.params.id } 
            });

            if (duplicateCheck) {
                return res.status(409).json({ 
                    statusCode: 409, 
                    message: "This image already exists in the gallery" 
                });
            }
        }

        // Update image
        image = await Gallery.findByIdAndUpdate(
            req.params.id,
            { image: newImage },
            { new: true }
        );

        res.status(200).json({ 
            statusCode: 200, 
            message: "Image updated successfully", 
            image
        });

    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Delete image
export const deleteImage = async (req, res) => {
    try {
        const deletedImage = await Gallery.findByIdAndDelete(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ 
                statusCode: 404,
                message: "Image not found" 
            });
        }
        res.status(200).json({ 
            statusCode: 200,
            message: "Image deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message 
        });
    }
};

// 📌 Get total count of images
export const countImages = async (req, res) => {
    try {
        const totalImages = await Gallery.countDocuments();
        res.status(200).json({
            statusCode: 200, 
            totalImages
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};