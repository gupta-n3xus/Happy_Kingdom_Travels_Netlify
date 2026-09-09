const DURATION_LABELS = {
  '4N/5D': '4 Nights / 5 Days',
  '5N/6D': '5 Nights / 6 Days',
  '6N/7D': '6 Nights / 7 Days',
  '7N/8D': '7 Nights / 8 Days',
  custom: 'Custom',
}

const STYLE_LABELS = {
  budget: 'Budget',
  comfort: 'Comfort',
  premium: 'Premium',
  luxury: 'Luxury',
}

function formatDate(dateStr) {
  if (!dateStr) return 'Not specified'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function safe(val, fallback = 'Not specified') {
  if (val === null || val === undefined || val === '') return fallback
  return String(val)
}

export function createTripPlannerMessage(formData) {
  const travelFrom = safe(formData.travelFrom)
  const travelDate = formatDate(formData.travelDate)
  const adults = safe(formData.adults, '2')
  const children = safe(formData.children, '0')
  const duration = formData.duration === 'custom' 
    ? safe(formData.customDuration, 'Custom') 
    : (DURATION_LABELS[formData.duration] || safe(formData.duration))
  const travelStyle = STYLE_LABELS[formData.travelStyle] || safe(formData.travelStyle)

  return `Hi Happy Kingdom Travels!

I'd like to plan a Bhutan trip. Here are my requirements:

📍 Travelling From: ${travelFrom}
📅 Travel Date: ${travelDate}
👨‍👩‍👧 Adults: ${adults}
🧒 Children: ${children}
🗓️ Duration: ${duration}
⭐ Travel Style: ${travelStyle}

Please send me the available packages and quotation.`
}

export function createPackageMessage(pkg) {
  const title = safe(pkg.title, 'a Bhutan package')
  return `Hi Happy Kingdom Travels!

I'm interested in the following package:

📦 Package: ${title}
💰 Price: ${pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : 'Please share'}
📅 Duration: ${safe(pkg.duration)}

Please share the full itinerary and details.`
}

export function createGeneralMessage() {
  return `Hi Happy Kingdom Travels!

I'm interested in a Bhutan tour package. I would like help planning my trip. Please share the available options and pricing.`
}

export function createGuideMessage(topic) {
  const subject = safe(topic, 'Bhutan travel')
  return `Hi Happy Kingdom Travels!

I was reading your travel guide about "${subject}" and have some questions. Could you help me with more details?`
}

export function createContactMessage(subject) {
  const sub = safe(subject, 'general enquiry')
  return `Hi Happy Kingdom Travels!

I have a ${sub}. I'd like to discuss this with your team.`
}

export function createDestinationMessage(destination) {
  const dest = safe(destination, 'Bhutan')
  return `Hi Happy Kingdom Travels!

I want to know more about visiting ${dest} and Bhutan tour packages that include ${dest}. Could you share the available options and pricing?`
}

const HOTEL_LABELS = {
  budget: 'Budget',
  standard: 'Standard',
  deluxe: 'Deluxe',
  premium: 'Premium',
  luxury: 'Luxury',
  any: 'Any',
}

export function createCustomTripMessage(formData) {
  const name = safe(formData.name, 'there')
  const travelFrom = safe(formData.travelFrom, 'Not specified')
  const travelDate = formatDate(formData.travelDate)
  const returnDate = formData.returnDate ? formatDate(formData.returnDate) : null
  const adults = safe(formData.adults, '2')
  const children = safe(formData.children, '0')
  const hotel = HOTEL_LABELS[formData.hotelPreference] || safe(formData.hotelPreference, 'Any')
  const budget = safe(formData.budgetRange, 'Not specified')
  const travelStyle = STYLE_LABELS[formData.travelStyle] || safe(formData.travelStyle, 'Not specified')
  const interests = formData.interests?.length > 0 ? formData.interests.join(', ') : 'Not specified'
  const special = formData.specialRequirements || 'None'
  const message = formData.message || 'None'

  let lines = [
    `Hi Happy Kingdom Travels!`,
    ``,
    `I'd like to plan a custom Bhutan trip. Here are my details:`,
    ``,
    `👤 Name: ${name}`,
    `📍 Travelling From: ${travelFrom}`,
    `📅 Travel Date: ${travelDate}`,
  ]

  if (returnDate) lines.push(`📅 Return Date: ${returnDate}`)
  lines.push(
    `👨‍👩‍👧 Adults: ${adults}`,
    `🧒 Children: ${children}`,
    `🏨 Hotel Preference: ${hotel}`,
    `💰 Budget: ${budget}`,
    `⭐ Travel Style: ${travelStyle}`,
    `🎯 Interests: ${interests}`,
    `📝 Special Requirements: ${special}`,
    ``,
    `💬 Additional Details: ${message}`,
    ``,
    `Please share a personalized itinerary and quotation.`,
  )

  return lines.join('\n')
}
