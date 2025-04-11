import About from '../models/about.model.js';
import fs from 'fs';
import path from 'path';

// Helper function to handle errors
const handleError = (res, error, statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({ 
    success: false, 
    message: error.message || 'Something went wrong' 
  });
};

// Create About Us
export const createAbout = async (req, res) => {
  try {
    const {
      aboutUsTitle,
      aboutUsSubTitle,
      aboutUsHeader,
      aboutUsDescription,
      aboutUsPhilosophyTitle,
      aboutUsPhilosophyDescription
    } = req.body;

    const imagePath = req.file ? req.file.path.replace('uploads', '') : null;

    const newAbout = new About({
      aboutUsTitle,
      aboutUsSubTitle,
      aboutUsHeader,
      aboutUsDescription,
      aboutUsPhilosophyTitle,
      aboutUsPhilosophyDescription,
      aboutUsImage: imagePath
    });

    const savedAbout = await newAbout.save();
    
    res.status(201).json({
      success: true,
      message: 'About Us created successfully',
      data: savedAbout
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get All About Us
export const getAllAbout = async (req, res) => {
  try {
    const abouts = await About.find().sort({ createdAt: -1 });
    
    if (!abouts || abouts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No About Us found'
      });
    }

    res.status(200).json({
      success: true,
      count: abouts.length,
      data: abouts
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get Single About Us by ID
export const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About Us not found'
      });
    }

    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update About Us
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About Us not found'
      });
    }

    const {
      aboutUsTitle,
      aboutUsSubTitle,
      aboutUsHeader,
      aboutUsDescription,
      aboutUsPhilosophyTitle,
      aboutUsPhilosophyDescription
    } = req.body;

    // Update fields
    about.aboutUsTitle = aboutUsTitle || about.aboutUsTitle;
    about.aboutUsSubTitle = aboutUsSubTitle || about.aboutUsSubTitle;
    about.aboutUsHeader = aboutUsHeader || about.aboutUsHeader;
    about.aboutUsDescription = aboutUsDescription || about.aboutUsDescription;
    about.aboutUsPhilosophyTitle = aboutUsPhilosophyTitle || about.aboutUsPhilosophyTitle;
    about.aboutUsPhilosophyDescription = aboutUsPhilosophyDescription || about.aboutUsPhilosophyDescription;
    about.updatedAt = Date.now();

    // Handle image update if new image is provided
    if (req.file) {
      // Delete old image if exists
      if (about.aboutUsImage) {
        const oldImagePath = path.join('uploads', about.aboutUsImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      about.aboutUsImage = req.file.path.replace('uploads', '');
    }

    const updatedAbout = await about.save();
    
    res.status(200).json({
      success: true,
      message: 'About Us updated successfully',
      data: updatedAbout
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete About Us
export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About Us not found'
      });
    }

    // Delete associated image if exists
    if (about.aboutUsImage) {
      const imagePath = path.join('uploads', about.aboutUsImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await about.remove();
    
    res.status(200).json({
      success: true,
      message: 'About Us deleted successfully'
    });
  } catch (error) {
    handleError(res, error);
  }
};