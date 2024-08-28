import mongoose, { Schema } from "mongoose";
const bookingSchema = new Schema(
  {
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot: {
      type: Date,
      required: true
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
