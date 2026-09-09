function parseUserAgent(ua) {
  if (!ua) return { browser: null, os: null, device: null };

  const browserRegexes = [
    { name: 'Edge', regex: /Edg[e\/]([\d.]+)/ },
    { name: 'Opera', regex: /(?:OPR|Opera)[\/ ]([\d.]+)/ },
    { name: 'Chrome', regex: /Chrome\/([\d.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
    { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
  ];

  const osRegexes = [
    { name: 'Windows', regex: /Windows NT ([\d.]+)/ },
    { name: 'macOS', regex: /Mac OS X ([\d._]+)/ },
    { name: 'Linux', regex: /Linux / },
    { name: 'Android', regex: /Android ([\d.]+)/ },
    { name: 'iOS', regex: /OS ([\d_]+) like Mac OS X/ },
  ];

  const deviceRegexes = [
    { type: 'mobile', regex: /Mobi|Android.*Mobile|iPhone|Opera Mini/i },
    { type: 'tablet', regex: /iPad|Android(?!.*Mobile)|Tablet/i },
  ];

  let browser = null;
  for (const { name, regex } of browserRegexes) {
    const match = ua.match(regex);
    if (match) {
      browser = { name, version: match[1] || '' };
      break;
    }
  }

  let os = null;
  for (const { name, regex } of osRegexes) {
    const match = ua.match(regex);
    if (match) {
      os = { name, version: match[1]?.replace(/_/g, '.') || '' };
      break;
    }
  }

  let device = null;
  for (const { type, regex } of deviceRegexes) {
    if (regex.test(ua)) {
      device = { type };
      break;
    }
  }
  if (!device) device = { type: 'desktop' };

  return { browser, os, device };
}

export async function getClientInfo() {
  const ua = navigator.userAgent || '';
  const language = navigator.language || '';
  const referrer = document.referrer || '';
  const screen = `${window.screen?.width}x${window.screen?.height}`;

  const { browser, os, device } = parseUserAgent(ua);

  let ip = '';
  let location = null;

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      ip = data.ip || '';
      location = {
        city: data.city || '',
        region: data.region || '',
        country: data.country_name || '',
        countryCode: data.country_code || '',
        lat: data.latitude || null,
        lng: data.longitude || null,
        timezone: data.timezone || '',
        isp: data.org || '',
      };
    }
  } catch {
    // silent - IP geolocation is best-effort
  }

  return {
    ipAddress: ip,
    userAgent: ua,
    browser,
    os,
    device,
    location,
    referrer,
    language,
    screen,
  };
}
