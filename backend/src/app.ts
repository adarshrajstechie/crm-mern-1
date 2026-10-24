import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import { prisma } from './config/db'; // Import prisma to test connection

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Try a quick query to verify DB connection
    await prisma.$runCommandRaw({ ping: 1 });
    res.status(200).json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', database: 'Disconnected', details: error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
  
  // Test database connection on startup
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to MongoDB via Prisma');
  } catch (error) {
    console.error('❌ FATAL: Failed to connect to MongoDB.');
    console.error('Check your .env DATABASE_URL and MongoDB Atlas IP Whitelist.');
    console.error(error);
  }
});

export default app;