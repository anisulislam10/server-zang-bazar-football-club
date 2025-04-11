import express from 'express';
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    countBlogs
} from '../controllers/blogpost.controller.js';

const router = express.Router();

router.post('/post', createBlog);
router.get('/get/all', getAllBlogs);
router.get('/count', countBlogs);
router.get('/get/:slug', getBlogBySlug);
router.put('/update/:slug', updateBlog);
router.delete('/delete/:slug', deleteBlog);

export default router;
