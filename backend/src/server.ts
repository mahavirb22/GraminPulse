import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/graminpulse';

// Middleware
app.use(cors({
  origin: '*', // Accepts requests from Vite React frontend (e.g. http://localhost:3000, http://localhost:5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    service: 'GraminPulse Backend API',
    timestamp: new Date().toISOString(),
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// API Routes
app.use('/api', apiRouter);

// Database Connection & Server Initialization
const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(`Successfully connected to MongoDB at ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`⚡️ [GraminPulse Server]: Running on http://localhost:${PORT}`);
      console.log(`🔗 API Base Endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    console.log('Starting Express server without active database connection for demo fallback...');
    app.listen(PORT, () => {
      console.log(`⚡️ [GraminPulse Server]: Running in fallback mode on http://localhost:${PORT}`);
    });
  }
};

startServer();

export default app;
