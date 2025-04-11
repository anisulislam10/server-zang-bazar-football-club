import ClubHonor from './../models/clubHonors.model.js';

// Create
export const createHonor = async (req, res) => {
  try {
    const honor = await ClubHonor.create(req.body);
    res.status(201).json({
      status: 'success',
      data: honor
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Read (All)
export const getAllHonors = async (req, res) => {
  try {
    const honors = await ClubHonor.find();
    res.status(200).json({
      status: 'success',
      results: honors.length,
      data: honors
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Read (Single)
export const getHonor = async (req, res) => {
  try {
    const honor = await ClubHonor.findById(req.params.id);
    if (!honor) {
      return res.status(404).json({
        status: 'fail',
        message: 'No honor found with that ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: honor
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Update
export const updateHonor = async (req, res) => {
  try {
    const honor = await ClubHonor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!honor) {
      return res.status(404).json({
        status: 'fail',
        message: 'No honor found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: honor
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete
export const deleteHonor = async (req, res) => {
  try {
    const honor = await ClubHonor.findByIdAndDelete(req.params.id);
    
    if (!honor) {
      return res.status(404).json({
        status: 'fail',
        message: 'No honor found with that ID'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

// Record Win
export const recordWin = async (req, res) => {
  try {
    const honor = await ClubHonor.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { winCount: 1 },
        $set: { lastWinDate: new Date() }
      },
      { new: true }
    );
    
    if (!honor) {
      return res.status(404).json({
        status: 'fail',
        message: 'No honor found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: honor
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};