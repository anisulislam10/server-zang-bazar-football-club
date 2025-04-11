import Member from "../models/member.model.js";

// 📌 Create a new member
export const createMember = async (req, res) => {
    try {
        const { memberName } = req.body;
        const memberImage = req.file ? req.file.filename : null;


        const existingMember = await Member.findOne({ 
            $or: [{ memberName }, { memberImage }]
        });

        if (existingMember) {
            return res.status(409).json({ 
                statusCode: 409,
                 message: "Member with this name or image already exists"
                 });
        }

        // Create new member
        const newMember = await Member.create({ memberName, memberImage });
        res.status(201).json({ 
            statusCode: 201,
             message: "Member created successfully", 
             Member: newMember 
            });

    } catch (error) {
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
        const members = await Member.find();
        res.status(200).json({ 
            statusCode: 200, 
            members
         });
    } catch (error) {
        res.status(500).json({
             statusCode: 500, 
             message: "Internal Server Error", 
             error: error.message 
            });
    }
};

// 📌 Get member by ID
export const getMemberById = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ 
                statusCode: 404, 
                message: "member not found" 
            });
        }
        res.status(200).json({ statusCode: 200, member });
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
        const { memberName } = req.body;
        const memberImage = req.file ? req.file.filename : undefined;

        // Find existing member
        let member = await Member.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ 
                statusCode: 404,
                 message: "member not found" 
                });
        }

        // Check if new name or image already exists
        if (memberName || memberImage) {
            const duplicateCheck = await Member.findOne({ 
                $or: [{ memberName }, { memberImage }],
                _id: { $ne: req.params.id } 
            });

            if (duplicateCheck) {
                return res.status(409).json({ 
                    statusCode: 409, 
                    message: "Another Member with this name or image already exists" 
                });
            }
        }

        // Update Member
        member = await Member.findByIdAndUpdate(
            req.params.id,
            { memberName, ...(memberImage && { memberImage }) },
            { new: true }
        );

        res.status(200).json({ 
            statusCode: 200, 
            message: "Member updated successfully", 
            member
         });

    } catch (error) {
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
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({ 
                statusCode: 404,
                 message: "Member not found" 
                });
        }
        res.status(200).json({ 
            statusCode: 200,
             message: "Member deleted successfully"
             });
    } catch (error) {
        res.status(500).json({ statusCode: 500,
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
             totalMembers
             });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};
