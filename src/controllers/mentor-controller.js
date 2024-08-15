import MentorRepository from "../repository/mentor-repository.js";
const mentorRepository = new MentorRepository();
import { StatusCodes } from "http-status-codes";
export const signUp = async (req, res) => {
  try {
    const mentor = await mentorRepository.signUp({
      username : req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      college: req.body.college,
      branch : req.body.branch,
      grad_year: req.body.grad_year,
      mobile_number : req.body.mobile_number
    });
    return res.status(StatusCodes.CREATED).json({
      data: mentor,
      success: true,
      msg: "Mentor Sign up successfull",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "Issues in signing up mentor",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await mentorRepository.getMentorByEmail(req.body.email);
    if (!user) {
      throw {
        message: "Mentor not found",
      };
    }
    if (!user.comparePassword(req.body.password)) {
      throw {
        message: "Incorrect Password",
      };
    }
    const token = user.createToken(user);
    return res.status(StatusCodes.OK).json({
      data: token,
      success: true,
      msg: "Mentor logged-in successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "Mentor login failed",
      err: error,
    });
  }
};
