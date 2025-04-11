import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from '../controllers/contact.controller.js';
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post('/post', upload.single("image"), createContact);
router.get('/getAll', getContacts);
router.get('/get/:id', getContactById);
router.put('/update/:id', upload.single("image"), updateContact);
router.delete('/delete/:id', deleteContact);

export default router;