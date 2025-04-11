import Contact from '../models/contact.model.js';
import ContactForm from '../models/contactForm.model.js'
import fs from 'fs';
import path from 'path';

export const createContact = async (req, res) => {
  try {
    const { phoneOne, phoneTwo, email, location } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const contact = new Contact({
      phoneOne,
      phoneTwo,
      email,
      location,
      image: imagePath.replace('uploads', '')
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: contact
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { phoneOne, phoneTwo, email, location } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Update fields
    contact.phoneOne = phoneOne || contact.phoneOne;
    contact.phoneTwo = phoneTwo || contact.phoneTwo;
    contact.email = email || contact.email;
    contact.location = location || contact.location;

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (contact.image) {
        const oldImagePath = path.join('uploads', contact.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      contact.image = req.file.path.replace('uploads', '');
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Delete associated image
    if (contact.image) {
      const imagePath = path.join('uploads', contact.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await ContactForm.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  export const deleteMessages = async(req,res)=>{
    try {
        const deleteMails= await ContactForm.findByIdAndDelete(req.params.id)
       
        if (!deleteMails) {
            return res.status(404).json({
              success: false,
              message: 'Email not found'
            });
          }
          res.status(200).json({
            success: true,
            message: 'Email deleted successfully'
          });

      
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });

        
    }
  }