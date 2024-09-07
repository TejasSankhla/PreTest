import BookingRepository from "../repository/booking-repository.js";
import { StatusCodes } from "http-status-codes";
import * as crypto from "crypto";
const bookingRepository = new BookingRepository();
import { createEvent } from "../utils/calendar-event.js";
import { razorpay, RAZORPAY_KEY_SECRET } from "../config/payment-gateway.js";
import { sendBookingConfirmationEmail } from "../utils/send-email.js";
export const createBooking = async (req, res) => {
  try {
    // first verify the payment

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.paymentResponse;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // if payment is verified crete booking
    if (razorpay_signature === expectedSign) {
      // Payment is verified

      const bookingDetails = {
        mentor: req.params.userId,
        client: req.body.client,
        slot: req.body.slot,
      };
      
      const newBooking = await bookingRepository.createBooking(bookingDetails);

      await sendBookingConfirmationEmail(newBooking);
      const options = {
        startTime: bookingDetails.slot,
        summary: `1:1 Mentorship Session with ${newBooking.mentor.name}`,
        location: "Virtual",
        client: newBooking.client.email,
        mentor: newBooking.mentor.email,
      };

      const link = await createEvent(options);
      // // now need to update link in the booking
      const updatedBooking = await bookingRepository.updateBookingStatus(
        newBooking._id,
        link
      );

      return res.status(StatusCodes.CREATED).json({
        data: updatedBooking,
        success: true,
        msg: "booking created with link",
        err: null,
      });
    } else {
      res.status(400).json({
        data: null,
        success: false,
        msg: "Invalid payment signature",
        err: null,
      });
    }
  } catch (error) {
    console.log("Error in booking controller : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error?.message || "Booking failed",
      err: error,
    });
  }
};

export const prevUserBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchUserBookings(
      req.params.userId,
      false
    );
    return res.status(StatusCodes.OK).json({
      data: bookings,
      success: true,
      msg: "bookings fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const upcomingUserBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchUserBookings(
      req.params.userId,
      true
    );
    return res.status(StatusCodes.OK).json({
      data: bookings,
      success: true,
      msg: "bookings fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const prevMentorBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchMentorBookings(
      req.params.userId,
      false
    );
    return res.status(StatusCodes.OK).json({
      data: bookings,
      success: true,
      msg: "bookings fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const upcomingMentorBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchMentorBookings(
      req.params.userId,
      true
    );
    return res.status(StatusCodes.OK).json({
      data: bookings,
      success: true,
      msg: "bookings fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const updateMentorAvailability = async (req, res) => {
  try {
    const updatedMentor = await mentorRepository.updateMentorAvailability(
      req.params.userId,
      req.body.updatedSlots
    );
    return res.status(StatusCodes.OK).json({
      data: updatedMentor,
      success: true,
      msg: "Mentor updated successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, update failure",
      err: error,
    });
  }
};
