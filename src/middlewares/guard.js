import jwt from "jsonwebtoken";
import { JWT_Secrete } from "../utils/constants";
import UserRepository from "../repository/user-repository";
import MentorRepository from "../repository/mentor-repository";
export async function authGuard(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw { message: "token not found" };
    }
    const decodedToken = jwt.verify(token, JWT_Secrete);
    if (decodedToken.type === "user") {
      const userRepository = new UserRepository();
      const user = await userRepository.getUserByEmail(decodedToken.email);
      req.user = user;
    } else {
      const mentorRepository = new MentorRepository();
      const mentor = await mentorRepository.getMentorByEmail(
        decodedToken.email
      );
      req.mentor = mentor;
    }
    next();
  } catch (error) {
    return res.status(200).json({
      data: null,
      success: false,
      msg: error?.message || "Please try again",
      err: error,
    });
  }
}
