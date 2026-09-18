import RotatingLogo from './RotatingLogo.jsx';
import Clock from './Clock.jsx';

export default function Shell({
  t,
  language,
  setLanguage,
  theme,
  setTheme,
  user,
  onLogout,
  children,
}) {
  const light = theme === 'light';
  return (
    <div className="shell flex flex-col">
      <header className="topbar">
        <div className="identity flex items-center">
          <RotatingLogo />
          <div>
            <div className="wordmark">
              SMOOTH
              <br />
              SAIL
            </div>
            <div className="legal">SMOOTH SAIL SP. Z O.O.</div>
          </div>
        </div>
        <div className="top-right">
          <span>{t.network}</span>
          <span className="divider">/</span>
          <nav className="languages" aria-label="Język / Language">
            {['pl', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                lang={lang}
                aria-pressed={language === lang}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            aria-pressed={light}
            aria-label={light ? t.darkLabel : t.lightLabel}
            onClick={() => setTheme(light ? 'dark' : 'light')}
          >
            {light ? t.darkMode : t.lightMode}
          </button>
          {user ? (
            <button type="button" className="theme-toggle" onClick={onLogout}>
              {t.logout}
            </button>
          ) : null}
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <span className="footer-left">
          <span className="cross" aria-hidden="true">
            +
          </span>
          {t.motto}
        </span>
        <span className="prototype">{user ? user.name : t.preview}</span>
        <Clock language={language} />
      </footer>
    </div>
  );
}
