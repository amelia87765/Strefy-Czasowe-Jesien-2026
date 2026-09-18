import { useEffect, useState } from 'react';
import AdminView from './components/AdminView.jsx';
import CalendarView from './components/CalendarView.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import ResourcesView from './components/ResourcesView.jsx';
import Shell from './components/Shell.jsx';
import { api } from './lib/api.js';
import { translations } from './translations.js';

function readPreference(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage is optional. */
  }
}

export default function App() {
  const [language, setLanguage] = useState(() => readPreference('smooth-sail-language', ['pl', 'en'], 'pl'));
  const [theme, setTheme] = useState(() => readPreference('smooth-sail-theme', ['dark', 'light'], 'dark'));
  const [user, setUser] = useState(undefined);
  const [view, setView] = useState('calendar');
  const [messageKey, setMessageKey] = useState('');
  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = translations[language].description;
    savePreference('smooth-sail-language', language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#ffffff' : '#100c0c';
    savePreference('smooth-sail-theme', theme);
  }, [theme]);

  useEffect(() => {
    api('/api/me')
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    try {
      await api('/api/logout', { method: 'POST' });
    } catch {
      /* cookie is cleared server-side when possible */
    }
    setUser(null);
    setView('calendar');
  }

  const nav = [
    { id: 'calendar', label: t.calendar },
    { id: 'resources', label: t.resources },
    ...(user?.role === 'admin' ? [{ id: 'crew', label: t.crewPanel }] : []),
  ];

  return (
    <Shell
      t={t}
      language={language}
      setLanguage={setLanguage}
      theme={theme}
      setTheme={setTheme}
      user={user && user.id ? user : null}
      onLogout={logout}
    >
      {user === undefined ? null : user === null ? (
        <LoginScreen t={t} onSuccess={setUser} messageKey={messageKey} setMessageKey={setMessageKey} />
      ) : user.mustChangePassword ? (
        <ChangePassword t={t} onSuccess={setUser} />
      ) : (
        <div className="app-deck">
          <div className="app-intro">
            <div className="path">
              {'C:\\SMOOTH_SAIL\\'}
              <br />
              <span>{t.pathApp}</span>
            </div>
            <p className="welcome-copy">{t.welcome}</p>
            <p className="quiet">{t.welcomeHint}</p>
          </div>
          <nav className="app-nav" aria-label={t.network}>
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={view === item.id}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {view === 'calendar' ? <CalendarView t={t} language={language} user={user} /> : null}
          {view === 'resources' ? <ResourcesView t={t} /> : null}
          {view === 'crew' && user.role === 'admin' ? <AdminView t={t} user={user} /> : null}
        </div>
      )}
    </Shell>
  );
}