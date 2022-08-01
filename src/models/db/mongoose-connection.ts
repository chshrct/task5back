import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export let mongooseConnection: Connection = null;
export async function connect(): Promise<void> {
  try {
    mongoose.connection.on('connecting', () => {
      console.log(`MongoDB: connecting.`);
    });
    mongoose.connection.on('connected', () => {
      console.log('MongoDB: connected.');
    });
    mongoose.connection.on('disconnecting', () => {
      console.log('MongoDB: disconnecting.');
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB: disconnected.');
    });

    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      const conn = await mongoose.connect(process.env.DB_URL, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
      mongooseConnection = conn.connection;
    }
  } catch (error) {
    console.log(`Error connecting to DB`, error);
  }
}
