import Express from "express";
const router = Express.Router();
import * as MentorController from "../../controllers/mentor-controller.js";
router.post("/sign-up", MentorController.signUp);
router.post("/sign-in", MentorController.signIn);
// get all mentors
router.get("/", MentorController.getAllMentors);
// fetch mentor profile along with available slots
router.get("/:userId", MentorController.fetchMentorProfile);
// update mentor data
router.patch("/update/:userId", MentorController.updateMentor);
router.put("/slots/:userId", MentorController.updateMentorAvailability);

// get all mentors from college
router.get("/explore/:college", MentorController.getAllMentorsFromCollege);

export default router;
