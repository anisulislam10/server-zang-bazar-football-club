import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import path from "path";
import cors from "cors";
import playerRoutes from "./routes/player.routes.js";
import superAdminRoutes from "./routes/superAdmin.routes.js";
import sliderRoutes from "./routes/sliderImage.routes.js";
import nextMatchRoutes from './routes/nextMatch.routes.js';
import lastMatchRoutes from './routes/lastMatch.routes.js';
import clubHonorsRouter from './routes/clubHonors.routes.js';
import memberRoutes from "./routes/member.routes.js";
import aboutRoutes from './routes/about.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminGetEmailRoutes from './routes/getEmail.routes.js';
import sendEmailRoutes from './routes/email.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import blogRoutes from './routes/blogpost.routes.js';

dotenv.config();
const app = express();

// Connect to database (do this once, not on every request)
connectDB().catch(console.error);

// Global error handler for MongoDB timeouts
app.use((req, res, next) => {
  res.setTimeout(25000, () => {
    res.status(504).json({ 
      error: 'Database operation timeout',
      message: 'Please try again later'
    });
  });
  next();
});

app.use(cors({
    origin: [
      'https://de32-37-111-165-214.ngrok-free.app',
      "http://localhost:5173", 
      "http://localhost:5174",  
      "https://6663-37-111-178-85.ngrok-free.app", 
      "http://localhost:5175",
      "https://client-zang-bazar-footbal-club.vercel.app"
    ],
}));
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// API routes
app.use("/api/players", playerRoutes);
app.use("/api/admin", superAdminRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/nextmatch", nextMatchRoutes);
app.use("/api/lastmatch", lastMatchRoutes);
app.use("/api/honors", clubHonorsRouter);
app.use("/api/members", memberRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/send", sendEmailRoutes);
app.use("/api/email", adminGetEmailRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/blog", blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel (remove app.listen) 
export default app;