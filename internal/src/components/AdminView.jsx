import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

const emptyUser = { email: '', name: '', password: '', role: 'member', resourceIds: [] };
const emptyResource = { type: 'form', title: '', embedUrl: '' };

export default function AdminView({ t, user }) {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [resource, setResource] = useState(emptyResource);
  const [message, setMessage] = useState('');
  const [resetId, setResetId] = useState(null);
  const [resetPassword, setResetPassword] = useState('');

  async function load() {
    const [crew, pack] = await Promise.all([api('/api/users'), api('/api/resources')]);
    setUsers(crew.users);
    setResources(pack.resources);
  }

  useEffect(() => {
    load().catch(() => setMessage('requestFailed'));
  }, []);

  function flash(code) {
    setMessage(code);
  }

  async function createUser(event) {
    event.preventDefault();
    try {
      await api('/api/users', { method: 'POST', body: form });
      setForm(emptyUser);
      await load();
      flash('');
    } catch (err) {
      flash(err.code === 'email_taken' ? 'emailTaken' : err.code === 'password_invalid' || err.code === 'invalid_user' ? 'passwordInvalid' : 'requestFailed');
    }
  }

  async function patchUser(id, body) {
    try {
      await api(`/api/users/${id}`, { method: 'PATCH', body });
      await load();
      flash('');
    } catch (err) {
      flash(err.code === 'last_admin' || err.code === 'cannot_demote_self' ? 'lastAdmin' : 'requestFailed');
    }
  }

  async function createResource(event) {
    event.preventDefault();
    try {
      await api('/api/resources', { method: 'POST', body: resource });
      setResource(emptyResource);
      await load();
      flash('');
    } catch {
      flash('requestFailed');
    }
  }

  async function removeResource(id) {
    try {
      await api(`/api/resources/${id}`, { method: 'DELETE' });
      await load();
    } catch {
      flash('requestFailed');
    }
  }

  function toggleResource(id, resourceId) {
    const account = users.find((row) => row.id === id);
    if (!account) return;
    const next = account.resourceIds.includes(resourceId)
      ? account.resourceIds.filter((item) => item !== resourceId)
      : [...account.resourceIds, resourceId];
    void patchUser(id, { resourceIds: next });
  }

  async function submitReset(event) {
    event.preventDefault();
    if (!resetId) return;
    await patchUser(resetId, { password: resetPassword });
    setResetId(null);
    setResetPassword('');
  }

  return (
    <div className="deck admin-deck">
      {message ? <p className="message">{t[message] || message}</p> : null}

      <section>
        <div className="eyebrow">
          <span className="block-label">{t.createUser}</span>
        </div>
        <form className="admin-form" onSubmit={createUser}>
          <input
            type="text"
            required
            minLength={2}
            maxLength={254}
            autoComplete="off"
            placeholder={t.email}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <input
            required
            placeholder={t.displayName}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
          <input
            type="password"
            required
            minLength={10}
            placeholder={t.tempPassword}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="member">{t.roleMember}</option>
            <option value="admin">{t.roleAdmin}</option>
          </select>
          <fieldset className="checks">
            <legend>{t.assignResources}</legend>
            {resources.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={form.resourceIds.includes(item.id)}
                  onChange={() => {
                    const next = form.resourceIds.includes(item.id)
                      ? form.resourceIds.filter((id) => id !== item.id)
                      : [...form.resourceIds, item.id];
                    setForm({ ...form, resourceIds: next });
                  }}
                />
                {item.title}
              </label>
            ))}
          </fieldset>
          <button className="submit" type="submit">
            {t.save}
          </button>
        </form>
      </section>

      <section>
        <div className="eyebrow">
          <span className="block-label">{t.users}</span>
        </div>
        <ul className="crew-list">
          {users.map((row) => (
            <li key={row.id}>
              <div>
                <strong>{row.name}</strong>
                <span className="quiet">
                  {' '}
                  {row.email} · {row.role === 'admin' ? t.roleAdmin : t.roleMember}
                  {row.active ? '' : ' · off'}
                </span>
              </div>
              <div className="crew-actions">
                {row.id !== user.id ? (
                  <button type="button" onClick={() => patchUser(row.id, { active: !row.active })}>
                    {row.active ? t.deactivate : t.activate}
                  </button>
                ) : null}
                <button type="button" onClick={() => setResetId(row.id)}>
                  {t.resetPassword}
                </button>
              </div>
              <fieldset className="checks">
                <legend>{t.assignResources}</legend>
                {resources.map((item) => (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      checked={row.resourceIds.includes(item.id)}
                      onChange={() => toggleResource(row.id, item.id)}
                    />
                    {item.title}
                  </label>
                ))}
              </fieldset>
            </li>
          ))}
        </ul>
        {resetId ? (
          <form className="admin-form" onSubmit={submitReset}>
            <input
              type="password"
              required
              minLength={10}
              placeholder={t.tempPassword}
              value={resetPassword}
              onChange={(event) => setResetPassword(event.target.value)}
            />
            <button className="submit" type="submit">
              {t.savePassword}
            </button>
            <button type="button" className="forgot" onClick={() => setResetId(null)}>
              {t.cancel}
            </button>
          </form>
        ) : null}
      </section>

      <section>
        <div className="eyebrow">
          <span className="block-label">{t.addResource}</span>
        </div>
        <form className="admin-form" onSubmit={createResource}>
          <select value={resource.type} onChange={(event) => setResource({ ...resource, type: event.target.value })}>
            <option value="form">{t.resourceForm}</option>
            <option value="sheet">{t.resourceSheet}</option>
            <option value="drive">{t.resourceDrive}</option>
          </select>
          <input
            required
            placeholder={t.title}
            value={resource.title}
            onChange={(event) => setResource({ ...resource, title: event.target.value })}
          />
          <input
            required
            type="url"
            placeholder={t.embedUrl}
            value={resource.embedUrl}
            onChange={(event) => setResource({ ...resource, embedUrl: event.target.value })}
          />
          <button className="submit" type="submit">
            {t.save}
          </button>
        </form>
        <ul className="crew-list">
          {resources.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span className="quiet"> · {t[{ form: 'resourceForm', sheet: 'resourceSheet', drive: 'resourceDrive' }[item.type]]}</span>
              </div>
              <button type="button" onClick={() => removeResource(item.id)}>
                {t.deleteResource}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
