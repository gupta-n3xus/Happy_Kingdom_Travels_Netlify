export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role === 'sub_admin' && req.user.permissions && req.user.permissions.includes(permission)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `You do not have permission: ${permission}`
    });
  };
};
