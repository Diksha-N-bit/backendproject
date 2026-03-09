import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    console.log(connectionInstance)
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};

export default connectDB;