import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import onboardingRoute from "../routes/onboardingRoute";
import artisansRoute from "../routes/artisansRoute";
import growthOsRoute from "../routes/growthOsRoute";
import shoppingRoute from "../routes/shoppingRoute";

const app = express();

// ── Security & Production Middlewares ──
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Rate Limiting ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, // Slightly higher for general api
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// ── CORS ──
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Defaults to wildcard; specify domains via ENV
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// ── Routes ──
app.use('/api/onboarding', onboardingRoute);
app.use('/api/artisans', artisansRoute);
app.use('/api/growth-os', growthOsRoute);
app.use('/api/shopping', shoppingRoute);

// ── Global Error Handler ──
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error: ', err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ── Listen ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));