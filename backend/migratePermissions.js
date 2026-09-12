import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const subAdmins = await User.find({ role: 'sub_admin' });
    
    for (const sa of subAdmins) {
      if (!sa.permissions || sa.permissions.length === 0) {
        sa.permissions = [
          'packages:view', 'packages:create', 'packages:edit', 'packages:delete',
          'reviews:view', 'reviews:approve', 'reviews:edit',
          'gallery:view', 'gallery:upload', 'gallery:approve'
        ];
        await sa.save();
        console.log(`Updated permissions for: ${sa.email}`);
      } else {
        console.log(`Already has permissions: ${sa.email}`);
      }
    }

    console.log('Migration complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Migration error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

migrate();
