import Booking from "../models/booking";
import CrudRepository from "./crud-repository";
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }
  async createBooking(bookingDetails) {
    try {
      const newBooking = await Booking.create(bookingDetails);
      return newBooking;
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
      throw error;
    }
  }
  async fetchUserBookings(userId) {
    try {
      const bookings = await Booking.find({ client: userId })
        .sort({ slot: -1 })
        .populate("mentor", "name college")
        .exec();
      return bookings;
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
      throw error;
    }
  }
  async fetchMentorBookings(userId) {
    try {
      const bookings = await Booking.find({ mentor: userId })
        .sort({ slot: -1 })
        .populate("client", "name")
        .exec();
      return bookings;
    } catch (error) {
      console.log("something went wrong in the Booking repository : ", error);
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
