import Express from "express";
const router = Express.Router();
import * as MentorController from "../../controllers/mentor-controller.js";
router.post("/sign-up", MentorController.signUp);
router.post("/sign-in", MentorController.signIn);
// get all mentors 
router.get("/", MentorController.getAllMentors);

// get all mentors from college
router.get("/explore/:college", MentorController.getAllMentorsFromCollege);
// fetch booking history for mentor
router.get("/bookings/:userId", MentorController.fetchMentorBookings);
// update mentor availability
router.put("/slots/:userId", MentorController.updateMentorAvailability);
// fetch mentor profile along with available slots
router.get("/:userId", MentorController.fetchMentorProfile);

export default router;
