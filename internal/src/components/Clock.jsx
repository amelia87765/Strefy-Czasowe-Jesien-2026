import { useEffect, useState } from 'react';

export default function Clock({ language }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span id="clock">{now.toLocaleTimeString(language === 'en' ? 'en-GB' : 'pl-PL', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Warsaw',
  })}</span>;
}
