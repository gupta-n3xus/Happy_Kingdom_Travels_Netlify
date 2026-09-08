import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not set in environment variables.');
    console.error('Add MONGODB_URI to your backend/.env file.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Atlas connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB Atlas connection failed.');
    console.error(`Error: ${error.message}`);

    if (error.message.includes('authentication failed')) {
      console.error('Check your MongoDB Atlas username and password.');
    } else if (error.message.includes('IP whitelist')) {
      console.error('Add your IP to the MongoDB Atlas network access list.');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
      console.error('Check your network connection and Atlas cluster status.');
    }

    process.exit(1);
  }
};

export default connectDB;
