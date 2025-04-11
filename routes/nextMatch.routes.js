import express from 'express';
import {
  createNextMatch,
  getAllNextMatches,
  getNextMatchById,
  updateNextMatch,
  deleteNextMatch
} from '../controllers/nextMatch.controller.js';

const router = express.Router();

// Create a new next match
router.post('/post', createNextMatch);

// Get all next matches
router.get('/getAll', getAllNextMatches);

// Get single next match
router.get('/get/:id', getNextMatchById);

// Update a next match
router.put('/update/:id', updateNextMatch);

// Delete a next match
router.delete('/delete/:id', deleteNextMatch);

export default router;