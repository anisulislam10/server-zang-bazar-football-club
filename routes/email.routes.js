import express from 'express';
import { getContactFormCount, submitContactForm } from '../controllers/contactForm.controller.js';

const router = express.Router();

router.post('/submit-form', submitContactForm);
router.get('/submit-count', getContactFormCount);



export default router;