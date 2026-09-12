import { logActivity, getUserAgent, getClientIp } from '../controllers/activityController.js';

export const log = (req, action, entity, entityId = null, entityName = null, details = null) => {
  if (!req.user) return;
  const { device, browser, os } = getUserAgent(req);
  const ip = getClientIp(req);
  logActivity({ user: req.user._id, sessionId: req.sessionId || null, action, entity, entityId, entityName, details, ip, device, browser, os });
};
