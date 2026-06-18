import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import analyticsRoutes from './routes/analyticsRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import exportRoutes from './routes/exportRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../../client/dist');

export const createApp = () => {
  const app = express();

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'InsightPulse Pro API' });
  });

  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/campaigns', campaignRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/export', exportRoutes);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(clientDist));
    app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  }

  return app;
};

