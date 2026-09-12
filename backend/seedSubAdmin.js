import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const existing = await User.findOne({ email: 'pankajkumar@hkt.com' });
    if (existing) {
      console.log('Sub-admin user already exists:', existing.email, 'role:', existing.role);
      await mongoose.disconnect();
      return;
    }

    const user = await User.create({
      name: 'Pankaj Kumar',
      email: 'pankajkumar@hkt.com',
      password: 'ThevalueofPIis3.14159@@@',
      role: 'sub_admin',
      permissions: [
        'packages:view', 'packages:create', 'packages:edit', 'packages:delete',
        'reviews:view', 'reviews:approve', 'reviews:edit',
        'gallery:view', 'gallery:upload', 'gallery:approve'
      ]
    });

    console.log('Sub-admin created successfully:', user.email, 'role:', user.role);
    console.log('Permissions:', user.permissions);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating sub-admin:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
