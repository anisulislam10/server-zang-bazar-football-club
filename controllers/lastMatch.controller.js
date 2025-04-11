import LastMatch from '../models/lastMatch.model.js';

// Create a last match result
export const createLastMatch = async (req, res) => {
  try {
    const { league, homeTeam, awayTeam, homeScore, awayScore, matchDate } = req.body;

    // Validation
    if (!league || !homeTeam || !awayTeam || homeScore === undefined || awayScore === undefined || !matchDate) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    if (typeof homeScore !== 'number' || typeof awayScore !== 'number' || homeScore < 0 || awayScore < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Scores must be positive numbers' 
      });
    }

    const newMatch = new LastMatch({
      league,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      matchDate: new Date(matchDate),
      status: 'completed'
    });

    const savedMatch = await newMatch.save();
    
    res.status(201).json({
      success: true,
      message: 'Match result created successfully',
      match: savedMatch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create match result',
      error: error.message
    });
  }
};

// Get all last matches
export const getAllLastMatches = async (req, res) => {
  try {
    const matches = await LastMatch.find().sort({ matchDate: -1 }); // Newest first
    
    res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match results',
      error: error.message
    });
  }
};

// Get single last match by ID
export const getLastMatchById = async (req, res) => {
  try {
    const match = await LastMatch.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({ 
        success: false,
        message: 'Match result not found' 
      });
    }

    res.status(200).json({
      success: true,
      match
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch match result',
      error: error.message
    });
  }
};

// Update a last match result
export const updateLastMatch = async (req, res) => {
  try {
    const { league, homeTeam, awayTeam, homeScore, awayScore, matchDate, status } = req.body;

    // Validation
    if (homeScore !== undefined && (typeof homeScore !== 'number' || homeScore < 0)) {
      return res.status(400).json({ 
        success: false,
        message: 'Home score must be a positive number' 
      });
    }

    if (awayScore !== undefined && (typeof awayScore !== 'number' || awayScore < 0)) {
      return res.status(400).json({ 
        success: false,
        message: 'Away score must be a positive number' 
      });
    }

    if (status && !['completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status value' 
      });
    }

    const updatedMatch = await LastMatch.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(matchDate && { matchDate: new Date(matchDate) })
      },
      { new: true, runValidators: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ 
        success: false,
        message: 'Match result not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match result updated successfully',
      match: updatedMatch
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update match result',
      error: error.message
    });
  }
};

// Delete a last match result
export const deleteLastMatch = async (req, res) => {
  try {
    const deletedMatch = await LastMatch.findByIdAndDelete(req.params.id);

    if (!deletedMatch) {
      return res.status(404).json({ 
        success: false,
        message: 'Match result not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match result deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete match result',
      error: error.message
    });
  }
};