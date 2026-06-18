import { campaigns } from '../data/demoData.js';

export const getCampaigns = (req, res) => {
  const channel = req.query.channel;
  const rows = channel && channel !== 'All' ? campaigns.filter((campaign) => campaign.channel === channel) : campaigns;
  res.json(rows.map((campaign) => ({ ...campaign, roi: Number(((campaign.revenue - campaign.spend) / campaign.spend).toFixed(2)) })));
};

