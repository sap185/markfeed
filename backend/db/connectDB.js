import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const dbName = process.env.DB_NAME;
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("connection problem in connectDB.js", error);
    }
}
export default connectDB;