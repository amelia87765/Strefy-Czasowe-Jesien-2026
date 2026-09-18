import { useState } from 'react';
import { api } from '../lib/api.js';

export default function ChangePassword({ t, onSuccess }) {
  const [currentPassword, setCurrent] = useState('');
  const [newPassword, setNext] = useState('');
  const [visible, setVisible] = useState(false);
  const [messageKey, setMessageKey] = useState('mustChange');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (newPassword.length < 10) {
      setMessageKey('passwordInvalid');
      return;
    }
    setBusy(true);
    try {
      const data = await api('/api/password', {
        method: 'POST',
        body: { currentPassword, newPassword },
      });
      setCurrent('');
      setNext('');
      onSuccess(data.user);
    } catch (error) {
      setMessageKey(error.code === 'invalid_credentials' ? 'invalidCredentials' : error.code === 'password_invalid' ? 'passwordInvalid' : 'requestFailed');
    } finally {
      setBusy(false);
    }
  }

  return (
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
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="current-password">
              01 <span>{t.currentPassword}</span>
            </label>
            <input
              id="current-password"
              type={visible ? 'text' : 'password'}
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrent(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="new-password">
              02 <span>{t.newPassword}</span>
            </label>
            <div className="password-wrap relative">
              <input
                id="new-password"
                type={visible ? 'text' : 'password'}
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNext(event.target.value)}
                required
                minLength={10}
              />
              <button className="reveal" type="button" onClick={() => setVisible((value) => !value)}>
                {visible ? t.hide : t.show}
              </button>
            </div>
          </div>
          <p className="message" role="status">
            {t[messageKey] || messageKey}
          </p>
          <button className="submit" type="submit" disabled={busy}>
            <span aria-hidden="true">&gt;</span>
            <span>{t.savePassword}</span>
          </button>
        </form>
      </section>
      <aside>
        <div className="aside-heading">
          <div className="path">
            {'C:\\SMOOTH_SAIL\\'}
            <br />
            <span>{'INTERNAL\\PASSWORD_'}</span>
          </div>
        </div>
        <div className="aside-copy">
          <p>{t.mustChange}</p>
        </div>
      </aside>
    </div>
  );
}
