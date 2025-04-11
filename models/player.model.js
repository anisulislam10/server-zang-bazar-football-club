import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: false,
        trim: true
    },
    playerImage: {
        type: String, 
        required: false
    }
}, { timestamps: true });

export default mongoose.model("Player", playerSchema);
