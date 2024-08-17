import Express from "express";
const router = Express.Router();
import * as UserController from "../../controllers/user-controller.js";

router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);

router.get("/boookings/:userId", UserController.fetchUserBookings);

export default router;
