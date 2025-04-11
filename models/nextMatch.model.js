// models/nextMatch.model.js
import mongoose from 'mongoose';

const nextMatchSchema = new mongoose.Schema({
  // League/Tournament Information
  league: {
    type: String,
    required: [true, 'League name is required'],
    trim: true
  },

  // Teams Information
  homeTeam: {
    type: String,
    required: [true, 'Home team name is required'],
    trim: true
  },

  awayTeam: {
    type: String,
    required: [true, 'Away team name is required'],
    trim: true
  },

  // Match Date and Time
  matchDate: {
    type: Date,
    required: [true, 'Match date is required']
  },
  matchTime: {
    type: String,
    required: [true, 'Match time is required']
  },

  // Match Status
  status: {
    type: String,
    enum: ['upcoming', 'live', 'postponed', 'cancelled'],
    default: 'upcoming'
  },

  // Automatic Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
nextMatchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const NextMatch = mongoose.model('NextMatch', nextMatchSchema);

export default NextMatch;