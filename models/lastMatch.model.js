import mongoose from 'mongoose';

const lastMatchSchema = new mongoose.Schema({
  league: {
    type: String,
    required: [true, 'League name is required'],
  },
  homeTeam: {
    type: String,
    required: [true, 'Home team is required'],
   
  },
  awayTeam: {
    type: String,
    required: [true, 'Away team is required'],
  },
  homeScore: {
    type: Number,
    required: [true, 'Home score is required'],
    min: 0
  },
  awayScore: {
    type: Number,
    required: [true, 'Away score is required'],
    min: 0
  },
  matchDate: {
    type: Date,
    required: [true, 'Match date is required']
  },
  status: {
    type: String,
    enum: ['completed', 'cancelled'],
    default: 'completed'
  }
}, { timestamps: true });

export default mongoose.model('LastMatch', lastMatchSchema);