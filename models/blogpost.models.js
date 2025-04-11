import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },       // short description
    description: { type: String, required: true },    // full blog content
    slug: { type: String, unique: true }
}, { timestamps: true });

blogSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
