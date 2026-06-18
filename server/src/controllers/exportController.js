import { campaigns } from '../data/demoData.js';

export const exportCampaigns = (_req, res) => {
  const header = 'id,name,owner,channel,spend,revenue,conversions,status';
  const rows = campaigns.map((campaign) =>
    [campaign.id, campaign.name, campaign.owner, campaign.channel, campaign.spend, campaign.revenue, campaign.conversions, campaign.status].join(',')
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="campaigns.csv"');
  res.send([header, ...rows].join('\n'));
};

