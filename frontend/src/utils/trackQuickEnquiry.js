const THROTTLE_KEY = 'hk_quick_enquiry';
const THROTTLE_MS = 24 * 60 * 60 * 1000;

function isThrottled(source) {
  try {
    const stored = JSON.parse(localStorage.getItem(THROTTLE_KEY) || '{}');
    const last = stored[source] || 0;
    return Date.now() - last < THROTTLE_MS;
  } catch {
    return false;
  }
}

function markSent(source) {
  try {
    const stored = JSON.parse(localStorage.getItem(THROTTLE_KEY) || '{}');
    stored[source] = Date.now();
    localStorage.setItem(THROTTLE_KEY, JSON.stringify(stored));
  } catch {}
}

export function trackQuickEnquiry(source, message) {
  if (isThrottled(source)) return;

  const body = JSON.stringify({ source, message });

  try {
    navigator.sendBeacon('/api/enquiries/quick', new Blob([body], { type: 'application/json' }));
  } catch {
    fetch('/api/enquiries/quick', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  }

  markSent(source);
}
