import NextMatch from '../models/nextMatch.model.js';

// Create a new next match
export const createNextMatch = async (req, res) => {
  try {
    const { league, homeTeam, awayTeam, matchDate, matchTime } = req.body;
    
    const newMatch = new NextMatch({
      league,
      homeTeam,
      awayTeam,
      matchDate: new Date(matchDate),
      matchTime
    });

    const savedMatch = await newMatch.save();
    res.status(201).json({
      success: true,
      message: 'Next match created successfully',
      match: savedMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create next match',
      error: error.message
    });
  }
};

// Get all next matches
export const getAllNextMatches = async (req, res) => {
  try {
    const matches = await NextMatch.find().sort({ matchDate: 1 }); // Sort by date ascending
    res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch matches',
      error: error.message
    });
  }
};

// Get single next match by ID
export const getNextMatchById = async (req, res) => {
  try {
    const match = await NextMatch.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.status(200).json({
      success: true,
      match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match',
      error: error.message
    });
  }
};

// Update a next match
export const updateNextMatch = async (req, res) => {
  try {
    const updatedMatch = await NextMatch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match updated successfully',
      match: updatedMatch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update match',
      error: error.message
    });
  }
};

// Delete a next match
export const deleteNextMatch = async (req, res) => {
  try {
    const deletedMatch = await NextMatch.findByIdAndDelete(req.params.id);

    if (!deletedMatch) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete match',
      error: error.message
    });
  }
};