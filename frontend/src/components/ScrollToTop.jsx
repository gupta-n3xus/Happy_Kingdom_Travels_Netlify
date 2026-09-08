import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();
  const isPop = useRef(false);

  useEffect(() => {
    const onPop = () => {
      isPop.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (isPop.current) {
      isPop.current = false;
      return;
    }

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, search]);

  return null;
}
