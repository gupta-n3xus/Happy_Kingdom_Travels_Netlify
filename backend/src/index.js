import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import packageRoutes from './routes/packages.js';
import destinationRoutes from './routes/destinations.js';
import enquiryRoutes from './routes/enquiries.js';
import reviewRoutes from './routes/reviews.js';
import blogRoutes from './routes/blog.js';
import faqRoutes from './routes/faqs.js';
import settingsRoutes from './routes/settings.js';
import trackingRoutes from './routes/tracking.js';
import uploadRoutes from './routes/upload.js';
import backupRoutes from './routes/backup.js';
import galleryRoutes from './routes/gallery.js';

const app = express();

app.set('trust proxy', 1);

connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/settings', (req, res, next) => next());

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/gallery', galleryRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running', version: '1.2.0' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log('Registered routes:', app._router.stack.filter(r => r.route || r.name === 'router').map(r => r.regexp?.toString() || r.route?.path || r.name).join(', '));
});

export default app;
