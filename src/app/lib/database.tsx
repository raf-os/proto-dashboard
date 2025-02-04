import mongoose from "mongoose";

declare global {
    var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
        throw new Error("MongoDB connection string is not defined in environment variables. Please define it as 'MONGODB_URI'.");
    }

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch(e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;