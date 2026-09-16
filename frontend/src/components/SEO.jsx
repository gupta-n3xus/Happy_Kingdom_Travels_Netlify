import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Happy Kingdom Travels'
const PROD_ORIGIN = 'https://happykingdomtravels.com'

const SEO = ({
  title = 'Bhutan Tour Packages | Bhutan Travels',
  description = 'Book the best Bhutan tour packages with customized itineraries, transparent pricing, and expert guidance.',
  keywords = 'Bhutan tour, Bhutan travel, Bhutan tour packages, Bhutan packages from India',
  image = '/og-image.jpg',
  url,
  type = 'website',
  robots,
}) => {
  const getCanonicalUrl = () => {
    if (url) return url
    if (typeof window === 'undefined') return ''
    const loc = window.location
    const origin = loc.origin === 'localhost' ? PROD_ORIGIN : loc.origin
    return `${origin}${loc.pathname}`
  }

  const currentUrl = getCanonicalUrl()
  const absoluteImage = image && !image.startsWith('http') ? `${PROD_ORIGIN}${image}` : image

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {robots && <meta name="robots" content={robots} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      {currentUrl && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  )
}

export default SEO
