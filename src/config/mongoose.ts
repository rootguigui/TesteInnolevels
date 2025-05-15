import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTIONSTRING ?? "");
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}

export default connectToDatabase;
