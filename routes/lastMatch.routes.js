import express from 'express';
import {
  createLastMatch,
  getAllLastMatches,
  getLastMatchById,
  updateLastMatch,
  deleteLastMatch
} from '../controllers/lastMatch.controller.js';

const router = express.Router();

// Create a new last match result
router.post('/post', createLastMatch);

// Get all last matches
router.get('/get', getAllLastMatches);

// Get single last match by ID
router.get('/get/:id', getLastMatchById);

// Update a last match result
router.put('/update/:id', updateLastMatch);

// Delete a last match result
router.delete('/delete/:id', deleteLastMatch);

export default router;