import Booking from "../models/booking.js";
import CrudRepository from "./crud-repository.js";
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }
  async createBooking(bookingDetails) {
    try {
      
      const newBooking = (await Booking.create(bookingDetails)).populate([
        {
          path: "mentor",
          select: "email name",
        },
        {
          path: "client",
          select: "email name",
        },
      ]);

      return newBooking;
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
      throw error;
    }
  }
  async fetchUserBookings(userId, upcoming) {
    try {
      const currDate = new Date();
      const sortOrder = upcoming ? 1 : -1; // 1 for ascending, -1 for descending

      const bookings = await Booking.find({
        client: userId,
        slot: upcoming ? { $gt: currDate } : { $lt: currDate },
      })
        .sort({ slot: sortOrder }) // Sort by slot date in increasing or decreasing order
        .populate("mentor", "name college profile_pic branch")
        .exec();

      return bookings;
    } catch (error) {
      console.log("Something went wrong in the Booking repository: ", error);
      throw error;
    }
  }
  async fetchMentorBookings(userId, upcoming) {
    try {
      const currDate = new Date();
      const sortOrder = upcoming ? 1 : -1; // 1 for ascending, -1 for descending

      const bookings = await Booking.find({
        mentor: userId,
        slot: upcoming ? { $gt: currDate } : { $lt: currDate },
      })
        .sort({ slot: sortOrder }) // Sort by slot date in increasing or decreasing order
        .populate("client", "name email mobile_number ")
        .exec();

      return bookings;
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
      throw error;
    }
  }
  async updateBookingStatus(bookingId, meeting_link) {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          meeting_link: meeting_link,
        },
        { new: true }
      );
      return updatedBooking;
    } catch (error) {
      console.log("something went wrong while updating status repository : ", error);
      throw error;
    }
  }

  // V2
  async cancelBooking(bookingId) {
    try {
      // first update status of the booking to be cancelled
      // notify client that the booking is cancelled
      // process refund -> refundTicket model -> generate a ticket and resolve manually by admins
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
      throw error;
    }
  }
}
export default BookingRepository;
