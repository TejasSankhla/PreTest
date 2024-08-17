import Express from "express";
const router = Express.Router();
import * as BookingController from "../../controllers/booking-controller.js";

router.post("/:userId", BookingController.createBooking);

export default router;
