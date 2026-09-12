import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sessionId: {
      type: String,
      default: null
    },
    action: {
      type: String,
      required: true,
      enum: [
        'login',
        'logout',
        'password_change',
        'profile_update',
        'create',
        'update',
        'delete',
        'approve',
        'export',
        'import'
      ]
    },
    entity: {
      type: String,
      default: null
    },
    entityId: {
      type: String,
      default: null
    },
    entityName: {
      type: String,
      default: null
    },
    details: {
      type: String,
      default: null
    },
    ip: {
      type: String,
      default: null
    },
    device: {
      type: String,
      default: null
    },
    browser: {
      type: String,
      default: null
    },
    os: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ sessionId: 1 });
activityLogSchema.index({ user: 1, sessionId: 1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
