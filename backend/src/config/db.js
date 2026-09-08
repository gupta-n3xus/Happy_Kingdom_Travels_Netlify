import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not set in environment variables.');
    console.error('Add MONGODB_URI to your backend/.env file.');
    process.exit(1);
  }

  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Atlas connected: ${conn.connection.host}/${conn.connection.name}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      if (attempt === maxRetries) {
        console.error('Max retries reached. Starting server without DB connection.');
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
