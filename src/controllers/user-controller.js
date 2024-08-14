import UserRepository from "../repository/user-repository.js";
const userRepository = new UserRepository();
import { StatusCodes } from "http-status-codes";
export const signUp = async (req, res) => {
  try {
    const user = await userRepository.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mssage: "not able to create user",
      data: "",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await userRepository.getUserByEmail(req.body.email);
    // console.log(user);
    if (!user) {
      throw {
        message: "User not found",
      };
    }
    if (!user.comparePassword(req.body.password)) {
      throw {
        message: "Incorrect Password",
      };
    }
    const token = user.createToken(user);
    return res.status(StatusCodes.OK).json({
      message: "user logged-in successfully",
      data: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mssage: "not able to login user",
      data: null,
      err: error,
    });
  }
};
