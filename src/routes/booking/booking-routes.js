import Express from "express";
const router = Express.Router();
import * as BookingController from "../../controllers/booking-controller.js";

// create booking
router.post("/:userId", BookingController.createBooking);

// fetch booking history
router.get("/user/prev/:userId", BookingController.prevUserBookings);
router.get("/user/upcoming/:userId", BookingController.upcomingUserBookings);
// fetch mentor bookings
router.get("/mentor/prev/:userId", BookingController.prevMentorBookings);
router.get(
  "/mentor/upcoming/:userId",
  BookingController.upcomingMentorBookings
);

export default router;
