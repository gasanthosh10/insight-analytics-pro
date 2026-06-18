import { Router } from 'express';
import { getCampaigns } from '../controllers/campaignController.js';

const router = Router();

router.get('/', getCampaigns);

export default router;

