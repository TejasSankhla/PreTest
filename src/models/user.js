import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.createToken = function (user) {
  const token = jwt.sign(
    {
      data: user,
    },
    "secret",
    { expiresIn: "1h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);
export default User;
