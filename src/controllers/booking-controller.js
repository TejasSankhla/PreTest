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
    console.log(bookingDetails);
    
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
