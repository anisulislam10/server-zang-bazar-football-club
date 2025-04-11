import express from 'express';
import {
  createHonor,
  getAllHonors,
  getHonor,
  updateHonor,
  deleteHonor,
  recordWin
} from '../controllers/clubHonors.controller.js';

const router = express.Router();

router.post('/post', createHonor);          
router.get('/getAll', getAllHonors);          
router.get('/get/:id', getHonor);          
router.put('/update/:id', updateHonor);        
router.delete('/delete/:id', deleteHonor);     

router.post('/:id/record-win', recordWin); 

export default router;