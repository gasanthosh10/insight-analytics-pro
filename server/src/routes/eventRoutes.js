import { Router } from 'express';
import { createEvent, getLiveEvents } from '../controllers/eventController.js';

const router = Router();

router.get('/live', getLiveEvents);
router.post('/', createEvent);

export default router;

