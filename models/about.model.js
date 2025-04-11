import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  aboutUsTitle: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsSubTitle: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsHeader: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsDescription: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsPhilosophyTitle: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsPhilosophyDescription: {
    type: String,
    required: false,
    trim: true
  },
  aboutUsImage: {
    type: String,
    required: false,

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const About = mongoose.model('About', aboutSchema);

export default About;