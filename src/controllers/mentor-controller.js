import BookingRepository from "../repository/booking-repository.js";
import MentorRepository from "../repository/mentor-repository.js";
const mentorRepository = new MentorRepository();
const bookingRepository = new BookingRepository();
import { StatusCodes } from "http-status-codes";
export const signUp = async (req, res) => {
  try {
    const mentor = await mentorRepository.signUp({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      college: req.body.college,
      branch: req.body.branch,
      grad_year: req.body.grad_year,
      mobile_number: req.body.mobile_number,
      location : req.body.location
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

export const fetchMentorBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchMentorBookings(
      req.params.userId
    );
    return res.status(StatusCodes.OK).json({
      data: bookings,
      success: true,
      msg: "bookings fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const updateMentorAvailability = async (req, res) => {
  try {
    const updatedMentor = await mentorRepository.updateMentorAvailability(
      req.params.userId,
      req.body.updatedSlots
    );
    return res.status(StatusCodes.OK).json({
      data: updatedMentor,
      success: true,
      msg: "Mentor updated successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, update failure",
      err: error,
    });
  }
};
export const fetchMentorProfile = async (req, res) => {
  try {
    const mentorProfile = await mentorRepository.fetchMentorProfile(
      req.params.userId
    );
    return res.status(StatusCodes.OK).json({
      data: mentorProfile,
      success: true,
      msg: "mentor fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorRepository.getAllMentors();
    return res.status(StatusCodes.OK).json({
      data: mentors,
      success: true,
      msg: "mentors fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
export const getAllMentorsFromCollege = async (req, res) => {
  try {
    
    const mentors = await mentorRepository.getAllMentorsFromCollege(
      req.params.college
    );
    return res.status(StatusCodes.OK).json({
      data: mentors,
      success: true,
      msg: "mentor fetched successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "try again after some time, fetch failure",
      err: error,
    });
  }
};
