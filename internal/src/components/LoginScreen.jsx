import { useRef, useState } from 'react';
import { api } from '../lib/api.js';

export default function LoginScreen({ t, onSuccess, setMessageKey, messageKey }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState('');
  const [busy, setBusy] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const recoveryRef = useRef(null);

  async function submit(event) {
    event.preventDefault();
    setInvalid('');
    const login = email.trim();
    if (login.length < 2 || login.length > 254 || /\s/.test(login)) {
      setInvalid('email');
      setMessageKey('invalidEmail');
      emailRef.current.focus();
      return;
    }
    if (!password) {
      setInvalid('password');
      setMessageKey('missingPassword');
      passwordRef.current.focus();
      return;
    }
    setBusy(true);
    try {
      const data = await api('/api/login', { method: 'POST', body: { email, password } });
      setPassword('');
      setMessageKey('');
      onSuccess(data.user);
    } catch (error) {
      setMessageKey(
        error.code === 'rate_limited'
          ? 'rateLimited'
          : error.code === 'invalid_credentials'
            ? 'invalidCredentials'
            : 'requestFailed',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="workspace grid">
        <section className="access" aria-labelledby="heading">
          <div className="login-heading">
            <div className="eyebrow">
              <span className="block-label">{t.crew}</span>
              <span className="version">V.01</span>
            </div>
            <h1 id="heading">
              SMOOTH SAIL
              <br />
              <span>
                INTERNAL
                <span className="cursor" aria-hidden="true">
                  _
                </span>
              </span>
            </h1>
          </div>
          <form id="login" noValidate onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">
                01 <span>{t.email}</span>
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                placeholder={t.placeholder}
                required
                minLength={2}
                maxLength={254}
                spellCheck={false}
                aria-describedby="message"
                aria-invalid={invalid === 'email' || undefined}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">
                02 <span>{t.password}</span>
              </label>
              <div className="password-wrap relative">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={visible ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  required
                  aria-describedby="message"
                  aria-invalid={invalid === 'password' || undefined}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  className="reveal"
                  type="button"
                  aria-label={visible ? t.hideLabel : t.showLabel}
                  aria-pressed={visible}
                  onClick={() => setVisible((value) => !value)}
                >
                  {visible ? t.hide : t.show}
                </button>
              </div>
            </div>
            <p id="message" className="message" role="status" aria-live="polite">
              {messageKey ? t[messageKey] : ''}
            </p>
            <button className="submit" type="submit" disabled={busy}>
              <span aria-hidden="true">&gt;</span>
              <span>{t.login}</span>
              <span className="enter" aria-hidden="true">
                ↵
              </span>
            </button>
            <button type="button" className="forgot" onClick={() => recoveryRef.current.showModal()}>
              {t.forgot}
            </button>
          </form>
        </section>
        <aside aria-label={t.info}>
          <div className="aside-heading">
            <div className="path">
              {'C:\\SMOOTH_SAIL\\'}
              <br />
              <span>{'INTERNAL\\LOGIN_'}</span>
            </div>
            <div className="ascii crew-stamp">{t.crewOnly}</div>
          </div>
          <div className="aside-copy">
            <p className="whitespace-pre-line">{t.shared}</p>
            <span className="side-rule" />
            <p className="quiet whitespace-pre-line">{t.access}</p>
          </div>
        </aside>
      </div>
      <dialog ref={recoveryRef} id="recovery" aria-labelledby="recovery-title">
        <form method="dialog">
          <div className="dialog-title">
            <span id="recovery-title">{t.recovery}</span>
            <button aria-label={t.close}>×</button>
          </div>
          <p>{t.recoveryHeading}</p>
          <p>{t.recoveryBody}</p>
          <button className="dialog-ok">{t.understood}</button>
        </form>
      </dialog>
    </>
  );
}
