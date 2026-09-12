import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (data) => {
  try {
    await ActivityLog.create(data);
  } catch (error) {
    console.error('Failed to log activity:', error.message);
  }
};

export const getUserAgent = (req) => {
  const ua = req.headers['user-agent'] || '';
  let device = 'Unknown';
  let browser = 'Unknown';
  let os = 'Unknown';

  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) {
    device = /ipad|tablet/i.test(ua) ? 'Tablet' : 'Mobile';
  } else {
    device = 'Desktop';
  }

  if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';
  else if (/edge/i.test(ua)) browser = 'Edge';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';

  return { device, browser, os };
};

export const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.ip || 'Unknown';
};

export const getActivityLogs = async (req, res, next) => {
  try {
    const { userId, page = 1, limit = 50 } = req.query;
    const query = {};
    if (userId) query.user = userId;

    const total = await ActivityLog.countDocuments(query);
    const logs = await ActivityLog.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

export const getSubAdminLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const total = await ActivityLog.countDocuments({ user: req.params.id });
    const logs = await ActivityLog.find({ user: req.params.id })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: logs
    });
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const { userId, page = 1, limit = 20 } = req.query;
    const matchQuery = { sessionId: { $ne: null } };
    if (userId) matchQuery.user = new (await import('mongoose')).default.Types.ObjectId(userId);

    const sessions = await ActivityLog.aggregate([
      { $match: matchQuery },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$sessionId',
          user: { $first: '$user' },
          loginTime: { $min: '$createdAt' },
          logoutTime: {
            $max: {
              $cond: [{ $eq: ['$action', 'logout'] }, '$createdAt', null]
            }
          },
          lastActivity: { $max: '$createdAt' },
          ip: { $first: '$ip' },
          device: { $first: '$device' },
          browser: { $first: '$browser' },
          os: { $first: '$os' },
          activities: {
            $push: {
              _id: '$_id',
              action: '$action',
              entity: '$entity',
              entityName: '$entityName',
              details: '$details',
              ip: '$ip',
              device: '$device',
              browser: '$browser',
              os: '$os',
              createdAt: '$createdAt'
            }
          },
          activityCount: { $sum: 1 }
        }
      },
      { $sort: { loginTime: -1 } },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) }
          ]
        }
      }
    ]);

    const result = sessions[0];
    const total = result.metadata[0]?.total || 0;

    const populatedData = await ActivityLog.populate(result.data, {
      path: 'user',
      model: 'User',
      select: 'name email role'
    });

    res.status(200).json({
      success: true,
      count: populatedData.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: populatedData
    });
  } catch (error) {
    next(error);
  }
};
