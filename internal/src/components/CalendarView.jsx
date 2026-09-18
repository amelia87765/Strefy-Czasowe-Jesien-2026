import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

function monthLabel(year, month, language) {
  return new Date(year, month - 1, 1).toLocaleDateString(language === 'en' ? 'en-GB' : 'pl-PL', {
    month: 'long',
    year: 'numeric',
  });
}

function warsawToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Warsaw' });
}

function buildCells(year, month) {
  const first = new Date(year, month - 1, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const days = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= days; day += 1) {
    cells.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarView({ t, language, user }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data, setData] = useState({ users: [], marks: [], events: [] });
  const [error, setError] = useState('');
  const [eventDate, setEventDate] = useState(warsawToday());
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const today = warsawToday();
  const admin = user.role === 'admin';

  async function load() {
    try {
      const next = await api(`/api/calendar?year=${year}&month=${month}`);
      setData(next);
      setError('');
    } catch {
      setError('requestFailed');
    }
  }

  useEffect(() => {
    void load();
  }, [year, month]);

  const names = useMemo(() => {
    const map = new Map(data.users.map((row) => [row.id, row.name]));
    return map;
  }, [data.users]);

  function shift(delta) {
    const date = new Date(year, month - 1 + delta, 1);
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  }

  async function toggleOwn(date) {
    if (date < today) return;
    try {
      await api('/api/calendar/availability', { method: 'POST', body: { date } });
      await load();
      setError('');
    } catch (err) {
      setError(err.code === 'already_confirmed' ? 'alreadyConfirmed' : 'requestFailed');
    }
  }

  async function setConfirm(userId, date, confirmed) {
    try {
      await api('/api/calendar/confirm', { method: 'POST', body: { userId, date, confirmed } });
      await load();
    } catch {
      setError('requestFailed');
    }
  }

  async function addEvent(event) {
    event.preventDefault();
    try {
      await api('/api/calendar/events', {
        method: 'POST',
        body: { date: eventDate, title: eventTitle, description: eventDescription },
      });
      setEventTitle('');
      setEventDescription('');
      await load();
    } catch {
      setError('requestFailed');
    }
  }

  async function removeEvent(id) {
    try {
      await api(`/api/calendar/events/${id}`, { method: 'DELETE' });
      await load();
    } catch {
      setError('requestFailed');
    }
  }

  const cells = buildCells(year, month);
  const weekdays = [t.weekday1, t.weekday2, t.weekday3, t.weekday4, t.weekday5, t.weekday6, t.weekday7];

  return (
    <div className="deck">
      <div className="deck-head">
        <button type="button" className="cal-nav" onClick={() => shift(-1)} aria-label={t.prevMonth}>
          ‹
        </button>
        <h2 className="cal-title">{monthLabel(year, month, language)}</h2>
        <button type="button" className="cal-nav" onClick={() => shift(1)} aria-label={t.nextMonth}>
          ›
        </button>
      </div>
      {error ? <p className="message">{t[error] || error}</p> : null}
      <div className="cal-weekdays">
        {weekdays.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div className="cal-grid">
        {cells.map((date, index) => {
          if (!date) return <div key={`e-${index}`} className="cal-cell empty" />;
          const dayMarks = data.marks.filter((mark) => mark.date === date);
          const mine = dayMarks.find((mark) => mark.userId === user.id);
          const events = data.events.filter((item) => item.date === date);
          const confirmed = dayMarks.filter((mark) => mark.status === 'confirmed');
          const pending = admin ? dayMarks.filter((mark) => mark.status === 'available') : [];
          const isToday = date === today;
          return (
            <div
              key={date}
              className={`cal-cell ${mine?.status === 'confirmed' ? 'is-confirmed' : ''} ${mine?.status === 'available' ? 'is-available' : ''} ${isToday ? 'is-today' : ''}`}
            >
              <button
                type="button"
                className="cal-day"
                onClick={() => toggleOwn(date)}
                disabled={date < today || mine?.status === 'confirmed'}
              >
                {Number(date.slice(-2))}
                {isToday ? <span className="cal-today">{t.today}</span> : null}
              </button>
              {confirmed.map((mark) => (
                <div key={`c-${mark.userId}`} className="cal-chip confirmed">
                  <span>{names.get(mark.userId) || mark.userId}</span>
                  {admin ? (
                    <button type="button" onClick={() => setConfirm(mark.userId, date, false)}>
                      {t.unconfirm}
                    </button>
                  ) : null}
                </div>
              ))}
              {pending.map((mark) => (
                <div key={`p-${mark.userId}`} className="cal-chip pending">
                  <span>{names.get(mark.userId) || mark.userId}</span>
                  <button type="button" onClick={() => setConfirm(mark.userId, date, true)}>
                    {t.confirmDay}
                  </button>
                </div>
              ))}
              {events.map((item) => (
                <div key={item.id} className="cal-chip event">
                  <span>{item.title}</span>
                  {admin ? (
                    <button type="button" onClick={() => removeEvent(item.id)} aria-label={t.removeEvent}>
                      ×
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="cal-legend">
        <span>
          <i className="swatch available" /> {t.legendAvailable}
        </span>
        <span>
          <i className="swatch confirmed" /> {t.legendConfirmed}
        </span>
        {admin ? (
          <span>
            <i className="swatch pending" /> {t.legendPending}
          </span>
        ) : null}
        <span>
          <i className="swatch event" /> {t.legendEvent}
        </span>
      </div>
      {admin ? (
        <form className="event-form" onSubmit={addEvent}>
          <div className="eyebrow">
            <span className="block-label">{t.addEvent}</span>
          </div>
          <div className="event-row">
            <input type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} required />
            <input
              value={eventTitle}
              onChange={(event) => setEventTitle(event.target.value)}
              placeholder={t.eventTitle}
              required
              maxLength={120}
            />
            <input
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
              placeholder={t.eventDescription}
              maxLength={500}
            />
            <button className="submit event-submit" type="submit">
              {t.save}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
