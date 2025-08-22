import mongoose from "mongoose";

async function connectDB() {
  mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
  await mongoose.connect(`${process.env.MONGODB_URL}/e-shop`);
}
export default connectDB;
