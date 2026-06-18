const days = ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10', 'Jun 11', 'Jun 12'];

export const timeSeries = days.map((day, index) => ({
  day,
  visitors: 820 + index * 74 + (index % 3) * 95,
  activeUsers: 420 + index * 42 + (index % 2) * 52,
  revenue: 6800 + index * 860 + (index % 4) * 620,
  conversionRate: Number((4.6 + index * 0.18 + (index % 2) * 0.21).toFixed(2))
}));

export const channels = [
  { name: 'Organic', visitors: 8420, conversions: 512, spend: 0 },
  { name: 'Paid Search', visitors: 6180, conversions: 438, spend: 8200 },
  { name: 'Social', visitors: 4720, conversions: 266, spend: 4100 },
  { name: 'Referral', visitors: 3190, conversions: 221, spend: 700 },
  { name: 'Email', visitors: 2860, conversions: 318, spend: 950 }
];

export const funnel = [
  { stage: 'Visitors', value: 25370 },
  { stage: 'Signups', value: 6420 },
  { stage: 'Activated', value: 3180 },
  { stage: 'Trials', value: 1260 },
  { stage: 'Paid', value: 742 }
];

export const campaigns = [
  { id: 'cmp-001', name: 'Launch Week Push', owner: 'Growth', channel: 'Paid Search', spend: 5200, revenue: 23800, conversions: 164, status: 'Scaling' },
  { id: 'cmp-002', name: 'Founder Newsletter', owner: 'Lifecycle', channel: 'Email', spend: 650, revenue: 11800, conversions: 91, status: 'Strong' },
  { id: 'cmp-003', name: 'Creator Partner Sprint', owner: 'Brand', channel: 'Social', spend: 3100, revenue: 9600, conversions: 72, status: 'Watch' },
  { id: 'cmp-004', name: 'Integration Marketplace', owner: 'Product', channel: 'Referral', spend: 900, revenue: 8300, conversions: 58, status: 'Strong' },
  { id: 'cmp-005', name: 'Search Retargeting', owner: 'Growth', channel: 'Paid Search', spend: 3000, revenue: 10450, conversions: 77, status: 'Optimizing' }
];

export let liveEvents = [
  { id: 'evt-1001', event: 'Account upgraded', account: 'Northstar CRM', value: 399, source: 'Paid Search', createdAt: new Date(Date.now() - 7 * 60000) },
  { id: 'evt-1002', event: 'Trial started', account: 'BrightDesk', value: 0, source: 'Organic', createdAt: new Date(Date.now() - 14 * 60000) },
  { id: 'evt-1003', event: 'Invoice paid', account: 'MetricMint', value: 1199, source: 'Email', createdAt: new Date(Date.now() - 24 * 60000) },
  { id: 'evt-1004', event: 'Demo booked', account: 'Acme Cloud', value: 0, source: 'Referral', createdAt: new Date(Date.now() - 37 * 60000) }
];

export const addLiveEvent = (event) => {
  const next = {
    id: `evt-${Date.now()}`,
    event: event.event || 'Custom event',
    account: event.account || 'New Account',
    value: Number(event.value || 0),
    source: event.source || 'Direct',
    createdAt: new Date()
  };

  liveEvents = [next, ...liveEvents].slice(0, 20);
  return next;
};

