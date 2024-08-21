import BookingRepository from "../repository/booking-repository.js";
import UserRepository from "../repository/user-repository.js";
const userRepository = new UserRepository();
const bookingRepository = new BookingRepository();
import { StatusCodes } from "http-status-codes";
export const signUp = async (req, res) => {
  try {
    const user = await userRepository.signUp({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile_number: req.body.mobile_number,
    });
    return res.status(StatusCodes.CREATED).json({
      data: user,
      success: true,
      msg: "User Sign up successfull",
      err: null,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        data: null,
        success: false,
        msg: error.message || "Issues in signing up user",
        err: error,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "Issues in signing up user",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await userRepository.getUserByEmail(req.body.email);

    if (!user.comparePassword(req.body.password)) {
      throw {
        code: 401,
        message: "Incorrect Password",
      };
    }
    const token = user.createToken(user);
    const userData = user.toObject();
    userData.token = token;

    return res.status(StatusCodes.OK).json({
      data: userData,
      success: true,
      msg: "user logged-in successfully",
      err: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      msg: error.message || "User login failed",
      err: error,
    });
  }
};

export const fetchUserBookings = async (req, res) => {
  try {
    const bookings = await bookingRepository.fetchUserBookings(
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
