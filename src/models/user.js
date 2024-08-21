import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  JWT_Secrete,
  JWT_Expiry,
  Bcrypt_saltRounds,
} from "../utils/constants.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      // required: true,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.createToken = function (user) {
  const token = jwt.sign(
    {
      UserId: user.id,
      email: user.email,
      type: "user",
    },
    JWT_Secrete,
    { expiresIn: JWT_Expiry }
  );
  return token;
};

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, Bcrypt_saltRounds);
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
