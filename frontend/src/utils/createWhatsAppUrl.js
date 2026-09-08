let _whatsappNumber = '917365004536';

export function setWhatsAppNumber(number) {
  _whatsappNumber = number;
}

export function createWhatsAppUrl(message, number) {
  const whatsappNumber = number || _whatsappNumber;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

export function openWhatsApp(message, number) {
  const url = createWhatsAppUrl(message, number);
  window.open(url, '_blank');
  return url;
}
