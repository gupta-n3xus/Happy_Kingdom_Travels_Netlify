import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getClientIp,
  isPrivateIp,
  parseUserAgent,
  geolocateIp,
} from '../src/controllers/enquiryController.js';

describe('getClientIp', () => {
  it('returns IP from x-forwarded-for header (first IP)', () => {
    const req = {
      headers: { 'x-forwarded-for': '203.0.113.50, 70.41.3.18' },
      ip: '127.0.0.1',
    };
    expect(getClientIp(req)).toBe('203.0.113.50');
  });

  it('trims whitespace from x-forwarded-for', () => {
    const req = {
      headers: { 'x-forwarded-for': '  203.0.113.50 , 70.41.3.18' },
      ip: '127.0.0.1',
    };
    expect(getClientIp(req)).toBe('203.0.113.50');
  });

  it('falls back to req.ip when no x-forwarded-for', () => {
    const req = { headers: {}, ip: '192.168.1.100' };
    expect(getClientIp(req)).toBe('192.168.1.100');
  });

  it('falls back to req.connection.remoteAddress', () => {
    const req = { headers: {}, ip: undefined, connection: { remoteAddress: '10.0.0.1' } };
    expect(getClientIp(req)).toBe('10.0.0.1');
  });

  it('returns null when no IP info available', () => {
    const req = { headers: {} };
    expect(getClientIp(req)).toBeNull();
  });

  it('returns null when x-forwarded-for is empty string', () => {
    const req = { headers: { 'x-forwarded-for': '' }, ip: undefined };
    expect(getClientIp(req)).toBeNull();
  });
});

describe('isPrivateIp', () => {
  it('returns true for null/undefined', () => {
    expect(isPrivateIp(null)).toBe(true);
    expect(isPrivateIp(undefined)).toBe(true);
  });

  it('returns true for localhost', () => {
    expect(isPrivateIp('localhost')).toBe(true);
  });

  it('returns true for 127.x.x.x', () => {
    expect(isPrivateIp('127.0.0.1')).toBe(true);
    expect(isPrivateIp('127.255.255.255')).toBe(true);
  });

  it('returns true for 10.x.x.x', () => {
    expect(isPrivateIp('10.0.0.1')).toBe(true);
    expect(isPrivateIp('10.255.255.255')).toBe(true);
  });

  it('returns true for 192.168.x.x', () => {
    expect(isPrivateIp('192.168.0.1')).toBe(true);
    expect(isPrivateIp('192.168.255.255')).toBe(true);
  });

  it('returns true for 172.16-31.x.x', () => {
    expect(isPrivateIp('172.16.0.1')).toBe(true);
    expect(isPrivateIp('172.31.255.255')).toBe(true);
    expect(isPrivateIp('172.16.100.50')).toBe(true);
  });

  it('returns false for 172.15.x.x (below range)', () => {
    expect(isPrivateIp('172.15.0.1')).toBe(false);
  });

  it('returns false for 172.32.x.x (above range)', () => {
    expect(isPrivateIp('172.32.0.1')).toBe(false);
  });

  it('returns true for ::1 (IPv6 loopback)', () => {
    expect(isPrivateIp('::1')).toBe(true);
  });

  it('returns true for 0.0.0.0', () => {
    expect(isPrivateIp('0.0.0.0')).toBe(true);
  });

  it('returns false for public IPs', () => {
    expect(isPrivateIp('8.8.8.8')).toBe(false);
    expect(isPrivateIp('203.0.113.50')).toBe(false);
    expect(isPrivateIp('1.1.1.1')).toBe(false);
  });
});

describe('parseUserAgent', () => {
  it('returns empty structure for null/undefined UA', () => {
    const result = parseUserAgent(null);
    expect(result).toEqual({ device: {}, browser: {}, os: {} });
  });

  it('returns empty structure for empty string UA', () => {
    const result = parseUserAgent('');
    expect(result).toEqual({ device: {}, browser: {}, os: {} });
  });

  it('detects Chrome on Windows', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = parseUserAgent(ua);
    expect(result.browser.name).toBe('Chrome');
    expect(result.browser.version).toBe('120.0.0.0');
    expect(result.os.name).toBe('Windows');
    expect(result.os.version).toBe('10');
    expect(result.device.type).toBe('desktop');
  });

  it('detects Safari on macOS', () => {
    const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15';
    const result = parseUserAgent(ua);
    expect(result.browser.name).toBe('Safari');
    expect(result.browser.version).toBe('17.2');
    expect(result.os.name).toBe('macOS');
    expect(result.device.type).toBe('desktop');
  });

  it('detects mobile device (iPhone)', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const result = parseUserAgent(ua);
    expect(result.device.type).toBe('mobile');
    expect(result.os.name).toBe('iOS');
    expect(result.os.version).toBe('17.0');
    expect(result.browser.name).toBe('Mobile Safari');
  });

  it('detects tablet device (iPad)', () => {
    const ua = 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    const result = parseUserAgent(ua);
    expect(result.device.type).toBe('tablet');
    expect(result.os.name).toBe('iOS');
  });

  it('detects Android Chrome', () => {
    const ua = 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
    const result = parseUserAgent(ua);
    expect(result.device.type).toBe('mobile');
    expect(result.os.name).toBe('Android');
    expect(result.os.version).toBe('13');
    expect(result.browser.name).toBe('Mobile Chrome');
  });

  it('defaults device type to desktop when not mobile/tablet', () => {
    const ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = parseUserAgent(ua);
    expect(result.device.type).toBe('desktop');
  });

  it('returns null for unknown browser/os fields', () => {
    const result = parseUserAgent('some-random-string');
    expect(result.browser.name).toBeNull();
    expect(result.os.name).toBeNull();
  });
});

describe('geolocateIp', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns null for null IP', async () => {
    expect(await geolocateIp(null)).toBeNull();
  });

  it('returns null for private IP', async () => {
    expect(await geolocateIp('192.168.1.1')).toBeNull();
    expect(await geolocateIp('127.0.0.1')).toBeNull();
    expect(await geolocateIp('10.0.0.1')).toBeNull();
  });

  it('returns location data for valid public IP', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        country_name: 'India',
        country_code: 'IN',
        region: 'Delhi',
        city: 'New Delhi',
        latitude: 28.6139,
        longitude: 77.209,
        timezone: 'Asia/Kolkata',
        org: 'AS9829 Vodafone Idea Limited',
      }),
    });

    const result = await geolocateIp('203.0.113.50');
    expect(result).toEqual({
      country: 'India',
      countryCode: 'IN',
      region: 'Delhi',
      city: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 'Asia/Kolkata',
      isp: 'AS9829 Vodafone Idea Limited',
    });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://ipapi.co/203.0.113.50/json/',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it('returns null when API returns error field', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ error: true, reason: 'Reserved range' }),
    });

    const result = await geolocateIp('203.0.113.50');
    expect(result).toBeNull();
  });

  it('returns null when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 });

    const result = await geolocateIp('203.0.113.50');
    expect(result).toBeNull();
  });

  it('returns null when fetch throws (network error)', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await geolocateIp('203.0.113.50');
    expect(result).toBeNull();
  });

  it('returns null when fetch times out (AbortError)', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new DOMException('The operation was aborted.', 'AbortError')), 100);
      });
    });

    const result = await geolocateIp('203.0.113.50');
    expect(result).toBeNull();
  });

  it('handles partial location data gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        country_name: 'United States',
        country_code: 'US',
        region: null,
        city: null,
        latitude: null,
        longitude: null,
        timezone: null,
        org: null,
      }),
    });

    const result = await geolocateIp('8.8.8.8');
    expect(result.country).toBe('United States');
    expect(result.countryCode).toBe('US');
    expect(result.region).toBeNull();
    expect(result.city).toBeNull();
  });
});
