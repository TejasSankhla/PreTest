import mongoose from "mongoose";
import { Mongo_URL } from "./server-config.js";
const connect = async () => {
  try {
    await mongoose.connect(Mongo_URL);
  } catch (error) {
    console.log("Database connection error : ", error);
  }
};
export default connect;
