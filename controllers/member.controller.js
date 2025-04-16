import Member from "../models/member.model.js";
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';

// Helper function to delete image file
const deleteImageFile = (filename) => {
  if (filename) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

// 📌 Create a new member
export const createMember = async (req, res) => {
    try {
        const { memberName, email, phone, description } = req.body;
        
        // Validation
        if (!memberName || !email) {
            // Clean up uploaded file if validation fails
            if (req.file) deleteImageFile(req.file.filename);
            return res.status(400).json({ 
                statusCode: 400,
                message: "Member name and email are required" 
            });
        }

        const memberImage = req.file ? req.file.filename : null;
        const slug = slugify(memberName, { lower: true, strict: true });

        // Check for existing member
        const existingMember = await Member.findOne({ 
            $or: [{ email }, { slug }]
        });

        if (existingMember) {
            // Clean up uploaded file if member exists
            if (req.file) deleteImageFile(req.file.filename);
            return res.status(409).json({ 
                statusCode: 409,
                message: existingMember.email === email 
                    ? "Member with this email already exists" 
                    : "Member with this name already exists"
            });
        }

        // Create new member
        const newMember = await Member.create({ 
            memberName, 
            memberImage,
            email,
            phone,
            description,
            slug 
        });
        
        res.status(201).json({ 
            statusCode: 201,
            message: "Member created successfully", 
            data: newMember 
        });

    } catch (error) {
        // Clean up on error
        if (req.file) deleteImageFile(req.file.filename);
        res.status(500).json({ 
            statusCode: 500,
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Get all Members
export const getMembers = async (req, res) => {
    try {
        const members = await Member.find({}, 'memberName email description phone slug memberImage createdAt');

        console.log('Successfully fetched members:', {
            count: members.length,
            sample: members.length > 0 ? members[0] : 'No members found'
        });

        res.status(200).json({ 
            statusCode: 200, 
            members
        });

    } catch (error) {
        console.error('Error fetching members:', {
            message: error.message,
            stack: error.stack
        });
        
        res.status(500).json({
            statusCode: 500, 
            message: "Internal Server Error",
            error: error.message 
        });
    }
};

// 📌 Get member by slug
export const getMemberBySlug = async (req, res) => {
    try {
        const member = await Member.findOne({ slug: req.params.slug });
        if (!member) {
            return res.status(404).json({ 
                statusCode: 404, 
                message: "Member not found" 
            });
        }
        res.status(200).json({ 
            statusCode: 200, 
            data: member 
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Update member
export const updateMember = async (req, res) => {
    try {
        const { memberName, email, phone, description } = req.body;
        const memberImage = req.file ? req.file.filename : undefined;
        const updateData = { email, phone, description };

        // Find existing member by slug
        const member = await Member.findOne({ slug: req.params.slug });
        if (!member) {
            if (req.file) deleteImageFile(req.file.filename);
            return res.status(404).json({ 
                statusCode: 404,
                message: "Member not found" 
            });
        }

        // Handle name change
        if (memberName && memberName !== member.memberName) {
            updateData.memberName = memberName;
            updateData.slug = slugify(memberName, { lower: true, strict: true });
            
            // Check for duplicate slug
            const slugExists = await Member.findOne({
                slug: updateData.slug,
                _id: { $ne: member._id }
            });
            
            if (slugExists) {
                if (req.file) deleteImageFile(req.file.filename);
                return res.status(409).json({ 
                    statusCode: 409, 
                    message: "Another member with this name already exists" 
                });
            }
        }

        // Handle image update
        if (memberImage) {
            updateData.memberImage = memberImage;
            // Delete old image file
            if (member.memberImage) {
                deleteImageFile(member.memberImage);
            }
        }

        // Update Member
        const updatedMember = await Member.findByIdAndUpdate(
            member._id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ 
            statusCode: 200, 
            message: "Member updated successfully", 
            data: updatedMember
        });

    } catch (error) {
        if (req.file) deleteImageFile(req.file.filename);
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// 📌 Delete Member
export const deleteMember = async (req, res) => {
    try {
        const member = await Member.findOne({ slug: req.params.slug });
        if (!member) {
            return res.status(404).json({ 
                statusCode: 404,
                message: "Member not found" 
            });
        }

        // Delete associated image file
        if (member.memberImage) {
            deleteImageFile(member.memberImage);
        }

        await Member.findByIdAndDelete(member._id);
        
        res.status(200).json({ 
            statusCode: 200,
            message: "Member deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Internal Server Error",
            error: error.message 
        });
    }
};

// 📌 Get total count of Members
export const countMembers = async (req, res) => {
    try {
        const totalMembers = await Member.countDocuments();
        res.status(200).json({
            statusCode: 200, 
            data: { totalMembers }
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};