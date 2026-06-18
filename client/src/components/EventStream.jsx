import { Activity, Plus } from 'lucide-react';
import { useState } from 'react';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function EventStream({ events, onCreate }) {
  const [account, setAccount] = useState('Nova Labs');

  const submit = (event) => {
    event.preventDefault();
    onCreate({ event: 'Demo booked', account, source: 'Direct', value: 0 });
    setAccount('Nova Labs');
  };

  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <span>Realtime</span>
          <h2>Live events</h2>
        </div>
      </div>
      <form className="event-form" onSubmit={submit}>
        <input value={account} onChange={(event) => setAccount(event.target.value)} />
        <button title="Add demo event">
          <Plus size={16} />
        </button>
      </form>
      <div className="event-list">
        {events.map((item) => (
          <article className="event-item" key={item.id}>
            <span className="event-icon">
              <Activity size={16} />
            </span>
            <div>
              <strong>{item.event}</strong>
              <p>{item.account} · {item.source}</p>
            </div>
            <span>{item.value ? currency.format(item.value) : 'Lead'}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

