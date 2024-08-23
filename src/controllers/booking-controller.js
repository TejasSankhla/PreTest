import BookingRepository from "../repository/booking-repository.js";
import { StatusCodes } from "http-status-codes";
const bookingRepository = new BookingRepository();
export const createBooking = async (req, res) => {
  try {
    const bookingDetails = {
      mentor: req.params.userId,
      client: req.body.client,
      slot: req.body.slot,
    };

    const newBooking = await bookingRepository.createBooking(bookingDetails);

    return res.status(StatusCodes.CREATED).json({
      data: newBooking,
      success: true,
      msg: "booking created",
      err: null,
    });
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
