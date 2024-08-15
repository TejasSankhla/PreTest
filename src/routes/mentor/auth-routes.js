import  Express  from "express";
const router = Express.Router();
import * as MentorController from "../../controllers/mentor-controller.js";

router.post("/sign-up", MentorController.signUp);
router.post("/sign-in", MentorController.signIn);

export default router;
