import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, CalendarDays, Gauge, MousePointerClick, RefreshCw, Search, TrendingUp, Users } from 'lucide-react';
import CampaignTable from './components/CampaignTable.jsx';
import EventStream from './components/EventStream.jsx';
import MetricCard from './components/MetricCard.jsx';
import { ChannelChart, ConversionBar, FunnelPanel, RevenueTrend } from './components/TrendCharts.jsx';
import { api } from './services/api.js';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('en-US');

const empty = {
  visitors: 0,
  activeUsers: 0,
  revenue: 0,
  conversions: 0,
  conversionRate: 0,
  roi: 0,
  churnRisk: 0,
  avgOrderValue: 0
};

export default function App() {
  const [summary, setSummary] = useState(empty);
  const [series, setSeries] = useState([]);
  const [channels, setChannels] = useState([]);
  const [funnel, setFunnel] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [events, setEvents] = useState([]);
  const [channel, setChannel] = useState('All');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [summaryRes, seriesRes, channelRes, funnelRes, campaignRes, eventRes] = await Promise.all([
      api.get('/analytics/summary'),
      api.get('/analytics/timeseries'),
      api.get('/analytics/channels'),
      api.get('/analytics/funnel'),
      api.get('/campaigns', { params: { channel } }),
      api.get('/events/live')
    ]);

    setSummary(summaryRes.data);
    setSeries(seriesRes.data);
    setChannels(channelRes.data);
    setFunnel(funnelRes.data);
    setCampaigns(campaignRes.data);
    setEvents(eventRes.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [channel]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => `${campaign.name} ${campaign.channel} ${campaign.status}`.toLowerCase().includes(query.toLowerCase()));
  }, [campaigns, query]);

  const createEvent = async (payload) => {
    await api.post('/events', payload);
    const { data } = await api.get('/events/live');
    setEvents(data);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span>IP</span>
          <strong>InsightPulse Pro</strong>
        </div>
        <nav>
          <a className="active" href="#overview">
            <BarChart3 size={18} />
            Overview
          </a>
          <a href="#campaigns">
            <TrendingUp size={18} />
            Campaigns
          </a>
          <a href="#events">
            <Activity size={18} />
            Live events
          </a>
        </nav>
        <div className="sidebar-card">
          <Gauge size={22} />
          <div>
            <strong>{summary.roi}x ROI</strong>
            <span>Portfolio return</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Full-stack analytics</span>
            <h1>Growth intelligence dashboard</h1>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search campaigns" />
            </div>
            <select value={channel} onChange={(event) => setChannel(event.target.value)}>
              {['All', 'Organic', 'Paid Search', 'Social', 'Referral', 'Email'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button className="icon-button" onClick={load} title="Refresh">
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="loading-state">Loading analytics...</div>
        ) : (
          <>
            <section className="metrics-grid" id="overview">
              <MetricCard icon={Users} label="Visitors" value={number.format(summary.visitors)} detail="+18.4% vs last period" tone="blue" />
              <MetricCard icon={Activity} label="Active users" value={number.format(summary.activeUsers)} detail="12-day rolling window" tone="green" />
              <MetricCard icon={TrendingUp} label="Revenue" value={currency.format(summary.revenue)} detail={`${currency.format(summary.avgOrderValue)} avg order`} tone="dark" />
              <MetricCard icon={MousePointerClick} label="Conversion" value={`${summary.conversionRate}%`} detail={`${summary.conversions} conversions`} tone="orange" />
            </section>

            <div className="dashboard-grid">
              <RevenueTrend data={series} />
              <div className="side-stack">
                <ChannelChart data={channels} />
                <FunnelPanel data={funnel} />
              </div>
            </div>

            <div className="lower-grid">
              <div id="campaigns">
                <CampaignTable campaigns={filteredCampaigns} />
              </div>
              <div className="side-stack" id="events">
                <ConversionBar data={channels} />
                <EventStream events={events} onCreate={createEvent} />
              </div>
            </div>

            <section className="insight-strip">
              <CalendarDays size={20} />
              <strong>Insight:</strong>
              <span>Email has the strongest conversion rate, while Paid Search is producing the highest volume. Shift budget toward retargeting and lifecycle campaigns.</span>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

