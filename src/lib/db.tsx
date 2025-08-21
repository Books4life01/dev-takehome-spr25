import mongoose from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */

//Found this solution to db connection cachin online, stores mongo db connection details in the global object so connectDB can be called multiple times and thhe same connection will be returned 
let cached = (global as any).mongoose;
if(!cached) cached = (global as any).mongoose = {conn:null,promise:null};
const connectDB = async () =>{
    if (cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(process.env.MONGO_URI!).then((mongoose)=>mongoose);
    }
    cached.conn = await cached.promise;
    console.log("connected")
    return cached.conn;
}
export default connectDB;