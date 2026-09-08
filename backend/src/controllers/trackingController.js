import PageView from '../models/PageView.js';
import Enquiry from '../models/Enquiry.js';

function detectDevice(userAgent) {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return 'tablet';
  if (/mobile|android|iphone|ipod/.test(ua)) return 'mobile';
  return 'desktop';
}

function detectBrowser(userAgent) {
  if (!userAgent) return '';
  if (/chrome/i.test(userAgent) && !/edg|opr/i.test(userAgent)) return 'Chrome';
  if (/firefox/i.test(userAgent)) return 'Firefox';
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'Safari';
  if (/edg/i.test(userAgent)) return 'Edge';
  if (/opr|opera/i.test(userAgent)) return 'Opera';
  return 'Other';
}

export const trackEvent = async (req, res, next) => {
  try {
    const { path, pageTitle, referrer, visitorId, sessionId, event, eventData } = req.body;
    const userAgent = req.headers['user-agent'] || '';

    if (!path || !visitorId) {
      return res.status(400).json({ success: false, message: 'path and visitorId are required' });
    }

    await PageView.create({
      path,
      pageTitle: pageTitle || '',
      referrer: referrer || '',
      visitorId,
      sessionId: sessionId || '',
      device: detectDevice(userAgent),
      browser: detectBrowser(userAgent),
      userAgent,
      event: event || 'pageview',
      eventData: eventData || {},
    });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      lifetimeVisitors,
      lifetimeSessions,
      lifetimePageViews,
      lifetimeWhatsapp,
      lifetimeQuotes,
      lifetimeEnquiries,
      lifetimeBookings,
      lifetimePhoneClicks,
      totalVisitors,
      totalSessions,
      recentPageViews,
      whatsappClicks,
      quoteSubmissions,
      enquirySubmissions,
      phoneClicks,
      topPages,
      deviceBreakdown,
      dailyViews,
      topPackages,
    ] = await Promise.all([
      PageView.distinct('visitorId').then(ids => ids.length),
      PageView.distinct('sessionId', { sessionId: { $ne: '' } }).then(ids => ids.length),
      PageView.countDocuments({ event: 'pageview' }),
      PageView.countDocuments({ event: 'whatsapp_click' }),
      PageView.countDocuments({ event: 'quote_submit' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: { $in: ['confirmed', 'completed'] } }),
      PageView.countDocuments({ event: 'phone_click' }),
      PageView.distinct('visitorId', { createdAt: { $gte: thirtyDaysAgo } }).then(ids => ids.length),
      PageView.distinct('sessionId', { createdAt: { $gte: thirtyDaysAgo }, sessionId: { $ne: '' } }).then(ids => ids.length),
      PageView.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      PageView.countDocuments({ event: 'whatsapp_click', createdAt: { $gte: thirtyDaysAgo } }),
      PageView.countDocuments({ event: 'quote_submit', createdAt: { $gte: thirtyDaysAgo } }),
      Enquiry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      PageView.countDocuments({ event: 'phone_click', createdAt: { $gte: thirtyDaysAgo } }),
      PageView.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo }, event: 'pageview' } },
        { $group: { _id: '$path', views: { $sum: 1 }, title: { $first: '$pageTitle' } } },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: '$device', count: { $sum: 1 } } },
      ]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo }, event: 'pageview' } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            views: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$visitorId' },
          },
        },
        {
          $project: {
            _id: 1,
            views: 1,
            uniqueVisitors: { $size: '$uniqueVisitors' },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo }, path: /\/packages\// } },
        {
          $group: {
            _id: '$path',
            views: { $sum: 1 },
            title: { $first: '$pageTitle' },
          },
        },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const leadsCount = enquirySubmissions;

    const deviceMap = {};
    deviceBreakdown.forEach(d => { deviceMap[d._id] = d.count; });

    res.status(200).json({
      success: true,
      data: {
        overview: {
          visitors: lifetimeVisitors,
          sessions: lifetimeSessions || lifetimeVisitors,
          pageViews: lifetimePageViews,
          leads: lifetimeEnquiries,
          whatsappClicks: lifetimeWhatsapp,
          quotes: lifetimeQuotes,
          bookings: lifetimeBookings,
          phoneClicks: lifetimePhoneClicks,
        },
        last30Days: {
          visitors: totalVisitors,
          sessions: totalSessions || totalVisitors,
          pageViews: recentPageViews,
          leads: leadsCount,
          whatsappClicks,
          quotes: quoteSubmissions,
          bookings: await Enquiry.countDocuments({
            status: { $in: ['confirmed', 'completed'] },
            createdAt: { $gte: thirtyDaysAgo },
          }),
          phoneClicks,
        },
        topPages,
        topPackages: topPackages.map(p => ({
          path: p._id,
          title: p.title || p._id,
          views: p.views,
        })),
        deviceBreakdown: deviceMap,
        dailyViews,
      },
    });
  } catch (error) {
    next(error);
  }
};
