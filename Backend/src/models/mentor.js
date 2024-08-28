import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  JWT_Secrete,
  JWT_Expiry,
  Bcrypt_saltRounds,
} from "../utils/constants.js";
const mentorSchema = new mongoose.Schema(
  {
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqdpzwcqp/image/upload/v1711788658/pq0ksh4pksddcskfxykh.png",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    mobile_number: {
      type: String,
      // required: true,
    },
    college: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    grad_year: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      // required: true,
    },
    about: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    session: {
      type: Number,
      default: 0,
    },
    linkedin_url: {
      type: String,
      default: null,
    },
    insta_url: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    meeting_id: {
      type: String,
    },
    unavailable_dates: [Date],
    selectedSlots: {
      0: [Date],
      1: [Date],
      2: [Date],
      3: [Date],
      4: [Date],
      5: [Date],
      6: [Date],
    },
  },
  { timestamps: true }
);

mentorSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
mentorSchema.methods.createToken = function (user) {
  const token = jwt.sign(
    {
      UserId: user.id,
      email: user.email,
      type: "mentor",
    },
    JWT_Secrete,
    { expiresIn: JWT_Expiry }
  );
  return token;
};

mentorSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, Bcrypt_saltRounds);
  next();
});
const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
