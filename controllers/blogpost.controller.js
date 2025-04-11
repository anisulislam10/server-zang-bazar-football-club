import Blog from '../models/blogpost.models.js';
import slugify from 'slugify';

// Create
export const createBlog = async (req, res) => {
    try {
        const { title, content, description } = req.body;
        const blog = await Blog.create({ title, content, description });
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}, 'title content description slug createdAt');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get One (by slug)
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
export const updateBlog = async (req, res) => {
    try {
        const { title, content, description } = req.body;
        const updateData = { title, content, description };

        if (title) {
            updateData.slug = slugify(title, { lower: true, strict: true });
        }

        const blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, updateData, { new: true });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const countBlogs = async (req, res) => {
    try {
        const count = await Blog.countDocuments(); 
        res.json({ count }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};