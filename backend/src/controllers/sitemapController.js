import Package from '../models/Package.js';
import Destination from '../models/Destination.js';
import BlogPost from '../models/BlogPost.js';

const BASE_URL = 'https://happykingdomtravels.com';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/bhutan-tour-packages', priority: '0.9', changefreq: 'weekly' },
  { path: '/bhutan-honeymoon-packages', priority: '0.8', changefreq: 'monthly' },
  { path: '/bhutan-family-packages', priority: '0.8', changefreq: 'monthly' },
  { path: '/bhutan-group-packages', priority: '0.8', changefreq: 'monthly' },
  { path: '/customize-your-trip', priority: '0.8', changefreq: 'monthly' },
  { path: '/destinations/paro', priority: '0.8', changefreq: 'monthly' },
  { path: '/destinations/thimphu', priority: '0.8', changefreq: 'monthly' },
  { path: '/destinations/punakha', priority: '0.8', changefreq: 'monthly' },
  { path: '/destinations/phuentsholing', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/haa-valley', priority: '0.7', changefreq: 'monthly' },
  { path: '/destinations/bumthang', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-mumbai', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-delhi', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-kolkata', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-bangalore', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-hyderabad', priority: '0.7', changefreq: 'monthly' },
  { path: '/bhutan-tour-from-chennai', priority: '0.7', changefreq: 'monthly' },
  { path: '/travel-guide', priority: '0.8', changefreq: 'weekly' },
  { path: '/travel-guide/bhutan-trip-cost', priority: '0.7', changefreq: 'monthly' },
  { path: '/travel-guide/how-to-reach-bhutan', priority: '0.7', changefreq: 'monthly' },
  { path: '/travel-guide/best-time-to-visit-bhutan', priority: '0.7', changefreq: 'monthly' },
  { path: '/travel-guide/bhutan-entry-requirements', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/reviews', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/faqs', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  { path: '/cancellation-policy', priority: '0.3', changefreq: 'yearly' },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildUrl(path, priority, changefreq, lastmod) {
  let xml = `  <url>\n    <loc>${BASE_URL}${escapeXml(path)}</loc>`;
  if (lastmod) xml += `\n    <lastmod>${lastmod}</lastmod>`;
  xml += `\n    <changefreq>${changefreq}</changefreq>`;
  xml += `\n    <priority>${priority}</priority>`;
  xml += `\n  </url>`;
  return xml;
}

export const generateSitemap = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const urls = [];

    for (const route of staticRoutes) {
      urls.push(buildUrl(route.path, route.priority, route.changefreq, today));
    }

    const [packages, destinations, blogPosts] = await Promise.all([
      Package.find({ status: { $in: ['active', 'published'] } }).select('slug updatedAt').lean(),
      Destination.find({}).select('slug updatedAt').lean(),
      BlogPost.find({ published: true }).select('slug updatedAt').lean(),
    ]);

    for (const pkg of packages) {
      if (pkg.slug) {
        const lastmod = pkg.updatedAt ? new Date(pkg.updatedAt).toISOString().split('T')[0] : today;
        urls.push(buildUrl(`/packages/${pkg.slug}`, '0.8', 'weekly', lastmod));
      }
    }

    for (const dest of destinations) {
      if (dest.slug && !['paro', 'thimphu', 'punakha', 'phuentsholing', 'haa-valley', 'bumthang'].includes(dest.slug)) {
        const lastmod = dest.updatedAt ? new Date(dest.updatedAt).toISOString().split('T')[0] : today;
        urls.push(buildUrl(`/destinations/${dest.slug}`, '0.7', 'monthly', lastmod));
      }
    }

    for (const post of blogPosts) {
      if (post.slug) {
        const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : today;
        urls.push(buildUrl(`/travel-guide/${post.slug}`, '0.6', 'monthly', lastmod));
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    return res.send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error.message);
    next(error);
  }
};
