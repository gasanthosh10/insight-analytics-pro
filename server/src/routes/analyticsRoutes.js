import { Router } from 'express';
import { getChannels, getFunnel, getSummary, getTimeSeries } from '../controllers/analyticsController.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/timeseries', getTimeSeries);
router.get('/channels', getChannels);
router.get('/funnel', getFunnel);

export default router;

