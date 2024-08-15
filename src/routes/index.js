import Express from "express";
const router = Express.Router();
import userRoutes from "./user/auth-routes.js";
import mentorRoutes from "./mentor/auth-routes.js";

router.use("/user", userRoutes);
router.use("/mentor", mentorRoutes);

export default router;
