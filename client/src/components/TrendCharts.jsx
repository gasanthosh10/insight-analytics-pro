import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const colors = ['#2563eb', '#0f766e', '#f59e0b', '#111827', '#7c3aed'];

export function RevenueTrend({ data }) {
  return (
    <section className="panel large-panel">
      <div className="section-heading">
        <div>
          <span>Performance</span>
          <h2>Revenue and active users</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={310}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.26} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="url(#revenue)" strokeWidth={3} />
          <Area type="monotone" dataKey="activeUsers" stroke="#2563eb" fill="url(#users)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export function ChannelChart({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="section-heading compact">
        <div>
          <span>Acquisition</span>
          <h2>Traffic mix</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="visitors" nameKey="name" innerRadius={54} outerRadius={88} paddingAngle={4}>
            {data.map((item, index) => (
              <Cell key={item.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export function FunnelPanel({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="section-heading compact">
        <div>
          <span>Conversion</span>
          <h2>Product funnel</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" fill="#111827" dataKey="stage" />
            {data.map((item, index) => (
              <Cell key={item.stage} fill={colors[index % colors.length]} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </section>
  );
}

export function ConversionBar({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="section-heading compact">
        <div>
          <span>Quality</span>
          <h2>Channel conversion</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="conversionRate" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

