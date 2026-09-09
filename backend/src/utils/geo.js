import pkg from 'ua-parser-js';
const UAParser = pkg.default || pkg;

const geoCache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

function isPrivateIP(ip) {
  if (!ip) return true;
  return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1' ||
    ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.16.') ||
    ip.startsWith('100.64.') || ip === '0.0.0.0';
}

export async function getGeoLocation(ip) {
  if (isPrivateIP(ip)) return null;

  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://free.freeipapi.com/api/json/${ip}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();

    const geoData = {
      city: data.cityName || '',
      region: data.regionName || '',
      country: data.countryName || '',
      countryCode: data.countryCode || '',
      lat: data.latitude || null,
      lng: data.longitude || null,
      timezone: data.timeZones?.[0] || '',
      isp: data.asnOrganization || '',
    };

    geoCache.set(ip, { data: geoData, timestamp: Date.now() });
    return geoData;
  } catch {
    return null;
  }
}

export function getClientIP(req) {
  const xRealIp = req.headers['x-real-ip'];
  if (xRealIp) return xRealIp.split(',')[0].trim();

  const nfIp = req.headers['x-nf-client-connection-ip'];
  if (nfIp) return nfIp.split(',')[0].trim();

  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const ips = xff.split(',').map((s) => s.trim());
    return ips[ips.length - 1];
  }

  return req.socket?.remoteAddress || '';
}

export function parseUA(uaString) {
  if (!uaString) return { browser: null, os: null, device: null };

  const parser = new UAParser(uaString);
  const result = parser.getResult();

  return {
    browser: result.browser.name ? { name: result.browser.name, version: result.browser.version } : null,
    os: result.os.name ? { name: result.os.name, version: result.os.version } : null,
    device: result.device.type ? { type: result.device.type, vendor: result.device.vendor, model: result.device.model } : null,
  };
}
