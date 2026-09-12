import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { logActivity, getUserAgent, getClientIp } from './activityController.js';

const generateToken = (id, tokenVersion = 0) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const sessionId = crypto.randomUUID();
    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    logActivity({
      user: user._id,
      sessionId,
      action: 'login',
      details: `${user.name} logged in`,
      ip, device, browser, os
    });

    const token = generateToken(user._id, user.tokenVersion || 0);

    res.status(200).json({
      success: true,
      token,
      sessionId,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || []
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is required to update profile'
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
      user.email = email.toLowerCase();
    }

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters'
        });
      }
      user.password = newPassword;
      user.tokenVersion = (user.tokenVersion || 0) + 1;
    }

    await user.save();

    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    const changes = [];
    if (newPassword) changes.push('password changed');
    if (email && email !== user.email) changes.push('email changed');
    if (name) changes.push('name updated');
    logActivity({
      user: user._id,
      action: newPassword ? 'password_change' : 'profile_update',
      details: changes.join(', ') || 'profile updated',
      ip, device, browser, os
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || []
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubAdmins = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'sub_admin' }).select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getSubAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'sub_admin' }).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const createSubAdmin = async (req, res, next) => {
  try {
    const { name, email, password, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'sub_admin',
      permissions: permissions || []
    });

    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    logActivity({
      user: req.user.id,
      action: 'create',
      entity: 'sub_admin',
      entityId: user._id.toString(),
      entityName: user.name,
      details: `Created sub-admin "${user.name}" (${user.email}) with ${user.permissions.length} permissions`,
      ip, device, browser, os
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubAdmin = async (req, res, next) => {
  try {
    const { name, email, password, permissions } = req.body;
    const user = await User.findOne({ _id: req.params.id, role: 'sub_admin' }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
      user.email = email.toLowerCase();
    }

    if (name) user.name = name;
    if (permissions !== undefined) user.permissions = permissions;
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }
      user.password = password;
      user.tokenVersion = (user.tokenVersion || 0) + 1;
    }

    await user.save();

    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    const changes = [];
    if (name) changes.push('name');
    if (email) changes.push('email');
    if (password) changes.push('password');
    if (permissions !== undefined) changes.push(`${permissions.length} permissions`);
    logActivity({
      user: req.user.id,
      action: password ? 'password_change' : 'update',
      entity: 'sub_admin',
      entityId: user._id.toString(),
      entityName: user.name,
      details: `Updated sub-admin "${user.name}": ${changes.join(', ') || 'no changes'}`,
      ip, device, browser, os
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'sub_admin' });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Sub-admin not found'
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    logActivity({
      user: req.user.id,
      action: 'delete',
      entity: 'sub_admin',
      entityId: req.params.id,
      entityName: user.name,
      details: `Deleted sub-admin "${user.name}" (${user.email})`,
      ip, device, browser, os
    });

    res.status(200).json({
      success: true,
      message: 'Sub-admin deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const { device, browser, os } = getUserAgent(req);
    const ip = getClientIp(req);
    logActivity({
      user: req.user._id,
      sessionId: sessionId || null,
      action: 'logout',
      details: `${req.user.name} logged out`,
      ip, device, browser, os
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
