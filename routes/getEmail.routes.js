import express from 'express';
import { getAllContacts, deleteMessages } from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/get-mails', getAllContacts);
router.delete('/delete/:id', deleteMessages);


export default router;