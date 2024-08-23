import Express from "express";
const router = Express.Router();
import * as BookingController from "../../controllers/booking-controller.js";

// create booking
router.post("/:userId", BookingController.createBooking);

// fetch booking history
router.get("/user/prev/:userId", BookingController.prevUserBookings);
router.get("/user/upcoming/:userId", BookingController.upcomingUserBookings);

export default router;
