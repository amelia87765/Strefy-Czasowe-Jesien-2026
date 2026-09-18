import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

const labels = {
  form: 'resourceForm',
  sheet: 'resourceSheet',
  drive: 'resourceDrive',
};

export default function ResourcesView({ t }) {
  const [resources, setResources] = useState([]);
  const [active, setActive] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/resources')
      .then((data) => {
        setResources(data.resources);
        setActive(data.resources[0]?.id ?? null);
      })
      .catch(() => setError('requestFailed'));
  }, []);

  const current = resources.find((item) => item.id === active) || null;

  return (
    <div className="deck resources-deck">
      {error ? <p className="message">{t[error]}</p> : null}
      {resources.length === 0 ? (
        <p className="quiet">{t.noResources}</p>
      ) : (
        <>
          <div className="resource-list">
            {resources.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === active ? 'resource-tab on' : 'resource-tab'}
                onClick={() => setActive(item.id)}
              >
                <span className="resource-type">{t[labels[item.type]] || item.type}</span>
                {item.title}
              </button>
            ))}
          </div>
          {current ? (
            <iframe
              className="resource-frame"
              title={current.title}
              src={current.embedUrl}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          ) : null}
        </>
      )}
    </div>
  );
}
