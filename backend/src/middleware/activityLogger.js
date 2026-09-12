import { logActivity, getUserAgent, getClientIp } from '../controllers/activityController.js';

const ENTITY_MAP = {
  '/api/packages': 'package',
  '/api/destinations': 'destination',
  '/api/blog': 'blog_post',
  '/api/reviews': 'review',
  '/api/enquiries': 'enquiry',
  '/api/gallery': 'gallery',
  '/api/faqs': 'faq',
  '/api/settings': 'settings',
  '/api/backup': 'backup',
  '/api/subadmins': 'sub_admin',
};

const ACTION_MAP = {
  POST: 'create',
  PUT: 'update',
  DELETE: 'delete',
};

export const activityLogger = (req, res, next) => {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return next();
  }

  if (!req.user) return next();

  const originalSend = res.send;
  res.send = function (body) {
    res.send = originalSend;
    res.send(body);

    try {
      if (res.statusCode >= 400) return;

      const basePath = '/' + req.path.split('/').filter(Boolean).slice(0, 1).join('/');
      const entity = ENTITY_MAP[req.baseUrl] || ENTITY_MAP[basePath] || req.baseUrl?.replace('/api/', '') || 'unknown';
      const action = ACTION_MAP[req.method] || req.method.toLowerCase();

      const { device, browser, os } = getUserAgent(req);
      const ip = getClientIp(req);

      let entityName = null;
      if (req.body?.name) entityName = req.body.name;
      else if (req.body?.title) entityName = req.body.title;
      else if (req.body?.fullName) entityName = req.body.fullName;

      const isPasswordAction = req.body?.password || req.body?.newPassword;

      logActivity({
        user: req.user._id,
        action: isPasswordAction && action === 'update' ? 'password_change' : action,
        entity,
        entityId: req.params.id || null,
        entityName,
        details: `${action.charAt(0).toUpperCase() + action.slice(1)} ${entity}${entityName ? ` "${entityName}"` : ''}`,
        ip, device, browser, os
      });
    } catch (err) {
      // silently fail - don't break the request
    }

    return res.send(body);
  };

  next();
};
