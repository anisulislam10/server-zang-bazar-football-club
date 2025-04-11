import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: false,
        trim: true
    },
    memberImage: {
        type: String, 
        required: false
    }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
