export const formatPrice = (amount, currency = 'INR') => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount)
  return formatted
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export const truncateText = (text, length = 100) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

export const getWhatsAppLink = (phone, message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export const generateMetaTags = (data) => {
  return {
    title: data.title || 'Bhutan Tour Packages',
    description: data.description || 'Book the best Bhutan tour packages',
    keywords: data.keywords || 'Bhutan tour, Bhutan travel',
    image: data.image || '/og-image.jpg',
    url: data.url || window.location.href,
  }
}
