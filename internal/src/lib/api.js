export async function api(path, { method = 'GET', body } = {}) {
  const response = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'request_failed');
    error.status = response.status;
    error.code = data.error || 'request_failed';
    throw error;
  }
  return data;
}
