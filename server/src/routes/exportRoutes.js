import { Router } from 'express';
import { exportCampaigns } from '../controllers/exportController.js';

const router = Router();

router.get('/campaigns.csv', exportCampaigns);

export default router;

