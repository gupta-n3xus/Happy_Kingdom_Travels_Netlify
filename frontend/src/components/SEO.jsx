import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Bhutan Tour Packages | Bhutan Travels',
  description = 'Book the best Bhutan tour packages with customized itineraries, transparent pricing, and expert guidance.',
  keywords = 'Bhutan tour, Bhutan travel, Bhutan tour packages, Bhutan packages from India',
  image = '/og-image.jpg',
  url,
  type = 'website',
}) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {currentUrl && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  )
}

export default SEO
