import { addLiveEvent, liveEvents } from '../data/demoData.js';

export const getLiveEvents = (_req, res) => {
  res.json(liveEvents);
};

export const createEvent = (req, res) => {
  const event = addLiveEvent(req.body);
  res.status(201).json(event);
};

