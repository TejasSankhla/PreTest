import Express from "express";
const router = Express.Router();
import userRoutes from "./user/auth-routes.js";
import mentorRoutes from "./mentor/auth-routes.js";
import bookingRoutes from "./booking/booking-routes.js";
import orderRoutes from "./order/order-routes.js";
router.use("/user", userRoutes);
router.use("/mentor", mentorRoutes);
router.use("/booking", bookingRoutes);
router.use("/order", orderRoutes);

export default router;
