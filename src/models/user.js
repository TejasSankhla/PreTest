import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { JWT_Secrete, JWT_Expiry } from "../utils/constants.js";
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
    college: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    companies: [
      {
        type: String,
      },
    ],
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
      userId: user.id,
      email: user.email,
    },
    JWT_Secrete,
    { expiresIn: JWT_Expiry }
  );
  return token;
};

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
