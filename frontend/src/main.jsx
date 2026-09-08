import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const suppressGTM = (msg) =>
  typeof msg === 'string' &&
  (msg.includes('startTime') || msg.includes('reportAllChanges') || msg.includes('web-vitals'));

window.onerror = function (msg) {
  if (suppressGTM(msg)) return true;
};

window.addEventListener('error', (e) => {
  if (suppressGTM(e.message) || suppressGTM(e.filename)) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return false;
  }
}, true);

window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason;
  if (reason && suppressGTM(reason.message || String(reason))) {
    e.preventDefault();
    e.stopPropagation();
  }
});

const _origSetTimeout = window.setTimeout;
window.setTimeout = function (fn, ms) {
  if (typeof fn === 'function') {
    const wrapped = function () {
      try { return fn.apply(this, arguments); } catch (e) {
        if (suppressGTM(e.message)) return;
        throw e;
      }
    };
    return _origSetTimeout(wrapped, ms);
  }
  return _origSetTimeout(fn, ms);
};

const _origRIC = window.requestIdleCallback;
if (_origRIC) {
  window.requestIdleCallback = function (cb, opts) {
    return _origRIC(function () {
      try { cb.apply(this, arguments); } catch (e) {
        if (suppressGTM(e.message)) return;
        throw e;
      }
    }, opts);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <HelmetProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a4731',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#40916c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
            },
          }}
        />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
