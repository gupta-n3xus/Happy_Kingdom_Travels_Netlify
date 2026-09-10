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

  let device = 'desktop';
  for (const { type, regex } of deviceRegexes) {
    if (regex.test(ua)) {
      device = type;
      break;
    }
  }

  return { browser, os, device };
}

export function getClientInfoSync() {
  const ua = navigator.userAgent || '';
  const language = navigator.language || '';
  const referrer = document.referrer || '';

  const { browser, os, device } = parseUserAgent(ua);

  return {
    ipAddress: '',
    userAgent: ua,
    browser,
    os,
    device,
    location: null,
    referrer,
    language,
  };
}

let cachedGeo = null;
let geoFetched = false;

export function fetchGeoInBackground() {
  if (geoFetched) return;
  geoFetched = true;

  fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) {
        cachedGeo = {
          ipAddress: data.ip || '',
          location: {
            city: data.city || '',
            region: data.region || '',
            country: data.country_name || '',
            countryCode: data.country_code || '',
            lat: data.latitude || null,
            lng: data.longitude || null,
            timezone: data.timezone || '',
            isp: data.org || '',
          },
        };
      }
    })
    .catch(() => {});
}

export function getCachedGeo() {
  return cachedGeo;
}
