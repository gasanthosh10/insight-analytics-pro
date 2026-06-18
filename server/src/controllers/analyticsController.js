import { campaigns, channels, funnel, timeSeries } from '../data/demoData.js';

const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);

export const getSummary = (_req, res) => {
  const visitors = sum(timeSeries, 'visitors');
  const activeUsers = sum(timeSeries, 'activeUsers');
  const revenue = sum(timeSeries, 'revenue');
  const conversions = sum(channels, 'conversions');
  const spend = sum(campaigns, 'spend');
  const campaignRevenue = sum(campaigns, 'revenue');

  res.json({
    visitors,
    activeUsers,
    revenue,
    conversions,
    conversionRate: Number(((conversions / visitors) * 100).toFixed(2)),
    roi: Number(((campaignRevenue - spend) / spend).toFixed(2)),
    churnRisk: 3.8,
    avgOrderValue: Math.round(revenue / conversions)
  });
};

export const getTimeSeries = (_req, res) => {
  res.json(timeSeries);
};

export const getChannels = (_req, res) => {
  res.json(channels.map((channel) => ({ ...channel, conversionRate: Number(((channel.conversions / channel.visitors) * 100).toFixed(2)) })));
};

export const getFunnel = (_req, res) => {
  res.json(funnel);
};

