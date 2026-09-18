import { useEffect, useRef, useState } from 'react';
import RotatingLogo from './components/RotatingLogo.jsx';
import Clock from './components/Clock.jsx';
import { translations } from './translations.js';

function readPreference(key, allowed, fallback) {
  try { const value = localStorage.getItem(key); return allowed.includes(value) ? value : fallback; }
  catch { return fallback; }
}
function savePreference(key, value) { try { localStorage.setItem(key, value); } catch { /* Storage is optional. */ } }

export default function App() {
  const [language, setLanguage] = useState(() => readPreference('smooth-sail-language', ['pl', 'en'], 'pl'));
  const [theme, setTheme] = useState(() => readPreference('smooth-sail-theme', ['dark', 'light'], 'dark'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [messageKey, setMessageKey] = useState('');
  const [invalid, setInvalid] = useState('');
  const emailRef = useRef(null), passwordRef = useRef(null), recoveryRef = useRef(null);
  const t = translations[language];
  const light = theme === 'light';

  useEffect(() => {
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]').content = translations[language].description;
    savePreference('smooth-sail-language', language);
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#ffffff' : '#100c0c';
    savePreference('smooth-sail-theme', theme);
  }, [theme]);

  function submit(event) {
    event.preventDefault();
    setInvalid('');
    if (!emailRef.current.validity.valid) {
      setInvalid('email'); setMessageKey('invalidEmail'); emailRef.current.focus(); return;
    }
    if (!password) {
      setInvalid('password'); setMessageKey('missingPassword'); passwordRef.current.focus(); return;
    }
    // Visual prototype: no credential request, storage, or authentication endpoint.
    setMessageKey('demo'); setPassword('');
  }

  return <>
    <div className="shell flex flex-col">
      <header className="topbar">
        <div className="identity flex items-center">
          <RotatingLogo />
          <div><div className="wordmark">SMOOTH<br />SAIL</div><div className="legal">SMOOTH SAIL SP. Z O.O.</div></div>
        </div>
        <div className="top-right">
          <span>{t.network}</span><span className="divider">/</span>
          <nav className="languages" aria-label="Język / Language">
            {['pl', 'en'].map(lang => <button key={lang} type="button" lang={lang} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}
          </nav>
          <button type="button" className="theme-toggle" aria-pressed={light} aria-label={light ? t.darkLabel : t.lightLabel} onClick={() => setTheme(light ? 'dark' : 'light')}>{light ? t.darkMode : t.lightMode}</button>
        </div>
      </header>
      <main>
        <div className="workspace grid">
          <section className="access" aria-labelledby="heading">
            <div className="login-heading">
              <div className="eyebrow"><span className="block-label">{t.crew}</span><span className="version">V.01</span></div>
              <h1 id="heading">SMOOTH SAIL<br /><span>INTERNAL<span className="cursor" aria-hidden="true">_</span></span></h1>
            </div>
            <form id="login" noValidate onSubmit={submit}>
              <div className="field">
                <label htmlFor="email">01 <span>{t.email}</span></label>
                <input ref={emailRef} id="email" name="email" type="email" autoComplete="username" placeholder={t.placeholder} required spellCheck={false} aria-describedby="message" aria-invalid={invalid === 'email' || undefined} value={email} onChange={event => setEmail(event.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="password">02 <span>{t.password}</span></label>
                <div className="password-wrap relative">
                  <input ref={passwordRef} id="password" name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••••••" required aria-describedby="message" aria-invalid={invalid === 'password' || undefined} value={password} onChange={event => setPassword(event.target.value)} />
                  <button className="reveal" type="button" aria-label={visible ? t.hideLabel : t.showLabel} aria-pressed={visible} onClick={() => setVisible(value => !value)}>{visible ? t.hide : t.show}</button>
                </div>
              </div>
              <p id="message" className="message" role="status" aria-live="polite">{messageKey ? t[messageKey] : ''}</p>
              <button className="submit" type="submit"><span aria-hidden="true">&gt;</span><span>{t.login}</span><span className="enter" aria-hidden="true">↵</span></button>
              <button type="button" className="forgot" onClick={() => recoveryRef.current.showModal()}>{t.forgot}</button>
            </form>
          </section>
          <aside aria-label={t.info}>
            <div className="aside-heading">
              <div className="path">{'C:\\SMOOTH_SAIL\\'}<br /><span>{'INTERNAL\\LOGIN_'}</span></div>
              <div className="ascii crew-stamp">{t.crewOnly}</div>
            </div>
            <div className="aside-copy"><p className="whitespace-pre-line">{t.shared}</p><span className="side-rule" /><p className="quiet whitespace-pre-line">{t.access}</p></div>
          </aside>
        </div>
      </main>
      <footer><span className="footer-left"><span className="cross" aria-hidden="true">+</span>{t.motto}</span><span className="prototype">{t.preview}</span><Clock language={language} /></footer>
    </div>
    <dialog ref={recoveryRef} id="recovery" aria-labelledby="recovery-title">
      <form method="dialog">
        <div className="dialog-title"><span id="recovery-title">{t.recovery}</span><button aria-label={t.close}>×</button></div>
        <p>{t.recoveryHeading}</p><p>{t.recoveryBody}</p><button className="dialog-ok">{t.understood}</button>
      </form>
    </dialog>
  </>;
}
