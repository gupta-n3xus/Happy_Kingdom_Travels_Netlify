import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import settingsService from '../services/settingsService';
import { setWhatsAppNumber } from '../utils/createWhatsAppUrl';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await settingsService.getSettings();
      const data = res.data?.data || res.data || {};
      setSettings(data);
      if (data.whatsapp) {
        setWhatsAppNumber(data.whatsapp.replace(/[^+\d]/g, ''));
      }
    } catch (err) {
      console.error('Failed to load site settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useBusinessContact() {
  const { settings } = useContext(SettingsContext) || {};

  const phone = settings?.phone || '+91 7365004536';
  const phoneLink = `tel:${phone.replace(/[^+\d]/g, '')}`;
  const email = settings?.email || 'happykingdomtravel@gmail.com';
  const whatsapp = settings?.whatsapp || '917365004536';
  const whatsappNumber = whatsapp.replace(/[^+\d]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi! I\'m interested in a Bhutan tour package.')}`;
  const address = settings?.address || 'Chota Mechiya Busty, Jaigaon, Alipurduar, West Bengal 736182';
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const socialLinks = settings?.socialLinks || { facebook: '', instagram: '', twitter: '', youtube: '' };

  return { phone, phoneLink, email, whatsappUrl, whatsappNumber, address, mapsUrl, socialLinks };
}

export function useSettings() {
  const { settings } = useContext(SettingsContext) || {};
  return settings;
}

export function useRefreshSettings() {
  const { refreshSettings } = useContext(SettingsContext) || {};
  return refreshSettings;
}
