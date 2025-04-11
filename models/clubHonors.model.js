import mongoose from 'mongoose';

const clubHonorsSchema = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: [true, 'Tournament name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Tournament name cannot exceed 100 characters']
  },
  winCount: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Win count cannot be negative']
  },
  lastWinDate: {
    type: Date,
    required: function() { return this.winCount > 0; },
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Last win date cannot be in the future'
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

export default mongoose.model('ClubHonor', clubHonorsSchema);