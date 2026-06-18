import { Download, TrendingUp } from 'lucide-react';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function CampaignTable({ campaigns }) {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span>Growth</span>
          <h2>Campaign performance</h2>
        </div>
        <a className="secondary-button" href={`${apiUrl}/export/campaigns.csv`}>
          <Download size={16} />
          CSV
        </a>
      </div>
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Spend</th>
              <th>Revenue</th>
              <th>ROI</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>
                  <span className="campaign-name">
                    <TrendingUp size={16} />
                    {campaign.name}
                  </span>
                </td>
                <td>{campaign.channel}</td>
                <td>{currency.format(campaign.spend)}</td>
                <td>{currency.format(campaign.revenue)}</td>
                <td>{campaign.roi}x</td>
                <td>
                  <span className={`status-pill ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

