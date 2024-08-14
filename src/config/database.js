import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/JCL");
  } catch (error) {
    console.log("Database connection error : ", error);
  }
};
export default connect;
