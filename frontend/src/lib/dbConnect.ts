import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hackman-v8';
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  var mongoose: MongooseCache | undefined;
}
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };
if (!global.mongoose) {
  global.mongoose = cached;
}
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
export default dbConnect;
