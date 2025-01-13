import mongoose from "mongoose";
// import { DB_NAME } from '../constants.js'
// const DB_NAME = "";

const dbConnect = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log("\nDatabase connected:", connectInstance.connection.host);
  } catch (error) {
    console.log("Error!!!:", error);
    process.exit(1);
  }
};

export default dbConnect;
