import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if(!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

// 

let cached = global.mongoose = global.mongoose || {};

if(!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null 
    }
}

const connectDb = async () => {
    if(cached.conn) {
        console.log("MongoDB connection Type => Cached connection")
        return cached.conn;
    }
    try {
        if(cached.promise) {
            console.log("MongoDB connection Type => Promise connection")
        }

        if(!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            console.log("MongoDB connection Type => New connection")
            cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((conn) => conn.connection.db);
        }
        
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
}

export default connectDb

