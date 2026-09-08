import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

function getVisitorId() {
  let id = localStorage.getItem('hk_visitor_id');
  if (!id) {
    id = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('hk_visitor_id', id);
  }
  return id;
}

function getSessionId() {
  let id = sessionStorage.getItem('hk_session_id');
  if (!id) {
    id = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem('hk_session_id', id);
  }
  return id;
}

function sendTrackingEvent(eventData) {
  try {
    navigator.sendBeacon('/api/tracking/event', new Blob(
      [JSON.stringify(eventData)],
      { type: 'application/json' }
    ));
  } catch {
    fetch('/api/tracking/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
      keepalive: true,
    }).catch(() => {});
  }
}

function injectGtag(ga4Id) {
  if (document.getElementById('ga4-script')) return;
  if (!ga4Id || typeof ga4Id !== 'string' || !ga4Id.startsWith('G-')) return;

  try {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    script.onerror = () => { window.gtag = null; };
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', ga4Id, { send_page_view: false });
  } catch {
    window.gtag = null;
  }
}

function gtagEvent(eventName, params) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // silent fail
  }
}

export function useTracking() {
  const location = useLocation();
  const lastTrackedPath = useRef('');
  const ga4Injected = useRef(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.filename?.includes('googletagmanager.com')) e.preventDefault();
    };
    window.addEventListener('error', handler);

    const fetchAndInject = async () => {
      if (ga4Injected.current) return;
      try {
        const res = await fetch('/api/settings');
        const json = await res.json();
        const ga4Id = json?.data?.analytics?.ga4Id;
        if (ga4Id) {
          injectGtag(ga4Id);
          ga4Injected.current = true;
        }
      } catch {
        // silent fail — analytics is optional
      }
    };
    fetchAndInject();

    return () => window.removeEventListener('error', handler);
  }, []);

  useEffect(() => {
    if (lastTrackedPath.current === location.pathname) return;
    lastTrackedPath.current = location.pathname;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    sendTrackingEvent({
      path: location.pathname,
      pageTitle: document.title,
      referrer: document.referrer,
      visitorId,
      sessionId,
      event: 'pageview',
    });

    gtagEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}

export function trackEvent(event, eventData = {}) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  sendTrackingEvent({
    path: window.location.pathname,
    pageTitle: document.title,
    referrer: document.referrer,
    visitorId,
    sessionId,
    event,
    eventData,
  });

  gtagEvent(event, eventData);
}

export function useTrackEvent() {
  return useCallback(trackEvent, []);
}
